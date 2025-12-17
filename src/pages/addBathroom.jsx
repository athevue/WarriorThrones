import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addBathroom.css";

const AMENITIES =
  "Soap|Paper towels|Air dryer|Wheelchair accessible entrance|Changing table|Touchless faucet|Disposable seat covers|Occupancy indicators|Trash can|Mirror|Automatic door push button|Automatic flushing toilets|Motion activated lights|Toilet paper|Menstrual products|Speakers / music|Sanitization schedule posted|ADA stall / grab bars|Braille signage|Accessible sink/dryer height|Coat hanger|Shower".split(
    "|"
  );

const RATING_KEYS = "cleanliness|odor|privacy|lighting".split("|");
const RATING_LABEL = (k) => k[0].toUpperCase() + k.slice(1);

const INITIAL_FORM={
  building: "",
  floor: "",
  location: "",
  restroomType: "unisex_private",
  notes: "",};

const INITIAL_RATINGS = Object.fromEntries(RATING_KEYS.map((k) => [k, 3]));

export default function AddBathroom() {
  const nav = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [amenities, setAmenities] = useState([]);
  const [ratings, setRatings] = useState(INITIAL_RATINGS);
  const [error, setError] = useState("");

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const toggleAmenity = (a) =>
    setAmenities((p) => (p.includes(a) ? p.filter((x) => x !== a) : [...p, a]));

  const setRating = (k, v) => setRatings((p) => ({ ...p, [k]: v }));

  const reset = () => (setForm(INITIAL_FORM), setAmenities([]), setRatings(INITIAL_RATINGS), setError(""));

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.building.trim() || !form.location.trim())
      return setError("Please fill in Building and Location.");

    console.log("Add bathroom payload:", {
      ...form,
      building: form.building.trim(),
      floor: form.floor.trim(),
      location: form.location.trim(),
      notes: form.notes.trim(),
      amenities,
      ratings,
    });

    alert("Submitted");
    nav("/");
  };

  return (
    <div className="ab-page">
      <header className="ab-hero">
        <div className="ab-wrap ab-heroRow">
          <div className="ab-heroText">
            <h1 className="ab-heroTitle">Add Bathroom</h1>
            <p className="ab-heroSubtitle">Add a restroom and quick ratings for Warrior Thrones.</p>
          </div>
          <button className="ab-heroBtn" type="button" onClick={() => nav("/")}>
            Home
          </button></div>
      </header>

      <main className="ab-main">
        <div className="ab-wrap">
          <div className="ab-card">
            {error && <div className="ab-alert">{error}</div>}

            <form className="ab-form" onSubmit={onSubmit} noValidate>
              <div className="ab-row2">
                <div className="ab-field">
                  <label htmlFor="building">Building *</label>
                  <input id="building" name="building" value={form.building} onChange={onChange} placeholder="e.g., Student Center" />
                </div>

                <div className="ab-field">
                  <label htmlFor="floor">Floor</label>
                  <input id="floor" name="floor" value={form.floor} onChange={onChange} placeholder="e.g., 1" />
                </div></div>

              <div className="ab-field">
                <label htmlFor="location">Location *</label>
                <input id="location" name="location" value={form.location} onChange={onChange} placeholder="e.g., Near elevators / by stairwell" />
              </div>

              <div className="ab-field">
                <label htmlFor="restroomType">Restroom Type</label>
                <select id="restroomType" name="restroomType" className="ab-selectTall" value={form.restroomType} onChange={onChange}>
                  <option value="mens">Men's</option>
                  <option value="womens">Women's</option>
                  <option value="unisex_private">Unisex / Private</option>
                </select> </div>

              <section className="ab-section">
                <div className="ab-sectionHead">
                  <h2>Amenities</h2>
                  <p>Tap to toggle</p> </div>
                <div className="ab-chips">
                  {AMENITIES.map((a) => (
                    <button
                      key={a}
                      type="button"
                      className={`ab-chip ${amenities.includes(a) ? "on" : ""}`}
                      onClick={() => toggleAmenity(a)}
                      aria-pressed={amenities.includes(a)}>
                      {a}
                    </button>))}</div>
              </section>

              <section className="ab-section">
                <div className="ab-sectionHead">
                  <h2>Ratings</h2>
                  <p>1 (worst) → 5 (best)</p></div>

                {RATING_KEYS.map((k) => (
                  <div className="ab-ratingRow" key={k}>
                    <div className="ab-ratingLabel">{RATING_LABEL(k)}</div>
                    <div className="ab-ratingBtns">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          className={`ab-rateBtn ${ratings[k] === n ? "on" : ""}`}
                          onClick={() => setRating(k, n)}
                          aria-pressed={ratings[k] === n}
                        >
                          {n}
                        </button>
                      ))}
                    </div></div>))}
              </section>

              <div className="ab-field">
                <label htmlFor="notes">Notes (optional)</label>
                <textarea id="notes" name="notes" rows={3} value={form.notes} onChange={onChange} placeholder="Anything helpful? (busy times, directions, etc.)" />
                </div>

              <div className="ab-actions">
                <button className="ab-btn ghost" type="button" onClick={reset}>
                  Reset
                </button>
                <button className="ab-btn primary" type="submit">
                  Submit
                </button>
              </div> </form> </div>
        </div>
      </main>
    </div>
  );
}
