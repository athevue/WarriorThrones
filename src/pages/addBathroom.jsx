import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addBathroom.css";
import Header from "../components/addBathroomComp/headerAddBathroom";

/* ==============================
   Amenities
============================== */
const AMENITIES = [
  { label: "Soap", key: "soap_1_0" },
  { label: "Paper towels", key: "paper_towel_1_or_0" },
  { label: "Air dryer", key: "air_dryer_1_or_0" },
  { label: "Changing table", key: "changing_table_1_or_0" },
  { label: "Touchless faucet", key: "touchless_tap_1_or_0" },
  { label: "Disposable seat covers", key: "disposable_seat_covers_1_or_0" },
  { label: "Occupancy indicators", key: "occupancy_indicators_1_or_0" },
  { label: "Trash can", key: "trash_can_1_or_0" },
  { label: "Mirror", key: "mirror_1_or_0" },
  { label: "Automatic door push button", key: "automatic_door_push_button_1_or_0" },
  { label: "Automatic flushing toilets", key: "automatic_flushing_toilets_1_or_0" },
  { label: "Motion activated lights", key: "motion_activated_lights_1_or_0" },
  { label: "Toilet paper", key: "toilet_paper_1_or_0" },
  { label: "Menstrual products", key: "menstrual_products_female_bathrooms_only_1_or_0" },
  { label: "ADA stall / grab bars", key: "ada_compliant_stall_s_with_grab_bar" },
  { label: "Braille signage", key: "braille_singage_1_or_0" },
  { label: "Accessible sink/dryer height", key: "accessible_sink_dryer_height" },
  { label: "Coat hanger", key: "coat_hanger" },
  { label: "Shower", key: "shower" },
  { label: "Speakers / music", key: "speakers_music_1_or_0" },
  { label: "Sanitization schedule posted", key: "sanitization_schedule_posted" }
];

/* ==============================
   Ratings (1–10)
============================== */
const RATING_FIELDS = [
  { key: "cleanliness_1_10", label: "Cleanliness" },
  { key: "lighting_1_10", label: "Lighting" },
  { key: "traffic_1_10", label: "Traffic" },
  { key: "sink_water_pressure_1_10", label: "Sink Water Pressure" },
  { key: "urinal_spacing_privacy_male_only_1_10", label: "Urinal Spacing" },
  { key: "room_temperature_hot_cold_1_10", label: "Room Temperature" },
  { key: "aesthetics_1_10", label: "Aesthetics" },
  { key: "general_noise_level_1_10", label: "General Noise Level" },
  { key: "ventilation_air_flow_1_10", label: "Ventilation" },
  { key: "nonslip_floor_1_10", label: "Safe Flooring" },
  { key: "privacy_1_10", label: "Privacy" },
  { key: "odor_1_10", label: "Odor" }
];

const INITIAL_RATINGS = Object.fromEntries(
  RATING_FIELDS.map(r => [r.key, 5])
);

export default function AddBathroom() {
  const nav = useNavigate();
  const [error, setError] = useState("");

  /* ==============================
     Form State
  ============================== */
  const [form, setForm] = useState({
    building_name: "",
    location_room: "",
    gender_type: "Unisex",
    num_of_stalls: "",
    notes: ""
  });

  const [ratings, setRatings] = useState(INITIAL_RATINGS);

  const [amenities, setAmenities] = useState(
    Object.fromEntries(AMENITIES.map(a => [a.key, 0]))
  );

  const onChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const setRating = (key, value) =>
    setRatings(prev => ({ ...prev, [key]: value }));

  const toggleAmenity = (key) =>
    setAmenities(prev => ({ ...prev, [key]: prev[key] ? 0 : 1 }));

  /* ==============================
     Submit
  ============================== */
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.building_name.trim() || !form.location_room.trim()) {
      return setError("Building and Location are required.");
    }

    try {

      // Calculate overall rating
      const ratingValues = Object.values(ratings); // [cleanliness, odor, ...]
      const overall_Rating = Math.round(
        (ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length) * 100
      ) / 100;
      

      const payload = {
        ...form,
        OverallRating: overall_Rating, // <-- dynamic
        num_of_stalls: form.num_of_stalls || null,
        ...ratings,
        ...amenities
      };

      console.log("POST PAYLOAD:", payload);

      const res = await fetch("http://localhost:5001/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to add bathroom");
      }

      alert("Bathroom added successfully!");
      nav("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  /* ==============================
     JSX
  ============================== */
  return (
    <div className="ab-page">

      <Header />


      <main className="ab-main">
        <div className="ab-wrap">
          <div className="ab-card">
            {error && <div className="ab-alert">{error}</div>}

            <form className="ab-form" onSubmit={onSubmit}>
              <div className="ab-field">
                <label>Building *</label>
                <input
                  name="building_name"
                  value={form.building_name}
                  onChange={onChange}
                />
              </div>

              <div className="ab-field">
                <label>Location *</label>
                <input
                  name="location_room"
                  value={form.location_room}
                  onChange={onChange}
                />
              </div>

              <div className="ab-field">
                <label>Gender Type</label>
                <select
                  name="gender_type"
                  className="ab-selectTall"
                  value={form.gender_type}
                  onChange={onChange}
                >
                  <option>Men</option>
                  <option>Women</option>
                  <option>Unisex</option>
                </select>
              </div>

              <div className="ab-field">
                <label>Number of Stalls</label>
                <input
                  type="number"
                  name="num_of_stalls"
                  value={form.num_of_stalls}
                  onChange={onChange}
                />
              </div>

              {/* Amenities */}
              <section className="ab-section">
                <div className="ab-sectionHead">
                  <h2>Amenities</h2>
                  <p>Tap to toggle</p>
                </div>

                <div className="ab-chips">
                  {AMENITIES.map(a => (
                    <button
                      key={a.key}
                      type="button"
                      className={`ab-chip ${amenities[a.key] ? "on" : ""}`}
                      onClick={() => toggleAmenity(a.key)}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </section>

              {/* Ratings */}
              <section className="ab-section">
                <div className="ab-sectionHead">
                  <h2>Ratings</h2>
                  <p>1 (worst) → 10 (best)</p>
                </div>

                {RATING_FIELDS.map(({ key, label }) => (
                  <div className="ab-ratingRow" key={key}>
                    <div className="ab-ratingLabel">{label}</div>

                    <div className="ab-ratingBtns">
                      {[...Array(10)].map((_, i) => {
                        const val = i + 1;
                        return (
                          <button
                            key={val}
                            type="button"
                            className={`ab-rateBtn ${ratings[key] === val ? "on" : ""}`}
                            onClick={() => setRating(key, val)}
                          >
                            {val}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </section>

              <div className="ab-field">
                <label>Notes</label>
                <textarea
                  name="notes"
                  rows={3}
                  value={form.notes}
                  onChange={onChange}
                />
              </div>

              <div className="ab-actions">
                <button
                  className="ab-btn ghost"
                  type="button"
                  onClick={() => nav("/")}
                >
                  Cancel
                </button>
                <button className="ab-btn primary" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
