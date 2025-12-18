// src/components/ReportBathroom/ReportForm.jsx
import React, { useState, useEffect } from "react";
import "./ReportForm.css";

const ReportForm = () => {
  const [formData, setFormData] = useState({
    reporter_name: "",
    building_name: "",
    location_room: "",
    description: "",
    urgency: "Low",
    floor: "",
    anonymous: false,
  });

  const [buildingOptions, setBuildingOptions] = useState([]);
  const [loadingBuildings, setLoadingBuildings] = useState(true);

  // Fetch building names from BathroomRatings table
  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5001/api/reviews/all");
        const data = await res.json();

        // Extract unique building names
        const buildings = Array.from(
          new Set(data.map((r) => r.building_name).filter(Boolean))
        );

        setBuildingOptions(buildings);
      } catch (err) {
        console.error("Failed to fetch building names:", err);
      } finally {
        setLoadingBuildings(false);
      }
    };

    fetchBuildings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((s) => ({ ...s, [name]: checked }));
    } else {
      setFormData((s) => ({ ...s, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.building_name || !formData.description || !formData.urgency) {
      alert("Please fill out all required fields.");
      return;
    }

    const payload = {
      reporter_name: formData.anonymous ? "Anonymous" : formData.reporter_name,
      description: formData.description,
      urgency: formData.urgency,
      building_name: formData.building_name,
      location_room: formData.location_room,
      floor: formData.floor || null,
    };

    try {
      const res = await fetch("http://127.0.0.1:5001/api/reviews/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to submit report.");
        return;
      }

      console.log("Report submitted:", data);
      alert("Report submitted successfully!");

      // Reset form
      setFormData({
        reporter_name: "",
        building_name: "",
        location_room: "",
        description: "",
        urgency: "Low",
        floor: "",
        anonymous: false,
      });
    } catch (err) {
      console.error("Error submitting report:", err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="report-form-container">
      <form onSubmit={handleSubmit} className="report-form">
        <label>
          Reporter Name *
          <input
            type="text"
            name="reporter_name"
            value={formData.reporter_name}
            onChange={handleChange}
            placeholder="Your name"
            required={!formData.anonymous}
          />
        </label>

        <label>
          Building Name *
          <input
            type="text"
            name="building_name"
            list="building-options"
            value={formData.building_name}
            onChange={handleChange}
            placeholder="Type or select building"
            required
          />
          <datalist id="building-options">
            {buildingOptions.map((b) => (
              <option key={b} value={b} />
            ))}
          </datalist>
        </label>

        <label>
          Location/Room (Optional)
            <input
              type="text"
              name="location_room"
              value={formData.location_room}
              onChange={handleChange}
              placeholder="Room or specific location"
            />
        </label>

        <label>
          Floor (Optional)
          <input
            type="text"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            placeholder="Floor number"
          />
        </label>

        <label>
          Description of Issue *
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the issue"
            required
          />
        </label>

        <label>
          Urgency Level *
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <label className="anon-label">
          <input
            type="checkbox"
            name="anonymous"
            checked={formData.anonymous}
            onChange={handleChange}
          />
          Submit Anonymously
        </label>

        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportForm;
