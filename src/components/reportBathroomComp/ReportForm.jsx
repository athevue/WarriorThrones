// src/components/ReportBathroom/ReportForm.jsx
import React, { useState } from "react";
import "./ReportForm.css";

const ReportForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    urgency: "Low",
    picture: null,
    anonymous: false,
  });

  const bathroomLocations = [
    "Undergraduate Library - Men",
    "Kresege Library - Women",
    "State Hall - Men",
    "State Hall - Women",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((s) => ({ ...s, [name]: checked }));
    } else if (type === "file") {
      setFormData((s) => ({ ...s, [name]: files[0] || null }));
    } else {
      setFormData((s) => ({ ...s, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now just log; backend will consume this later via POST /reports
    console.log("Report submitted:", formData);

    // Reset form
    setFormData({
      name: "",
      location: "",
      description: "",
      urgency: "Low",
      picture: null,
      anonymous: false,
    });

    alert("Report submitted.");
  };

  return (
    <div className="report-form-container">
      <h2>Submit a Bathroom Issue</h2>
      <form onSubmit={handleSubmit} className="report-form">
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required={!formData.anonymous}
          />
        </label>

        <label>
          Bathroom Location
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          >
            <option value="">Select location</option>
            {bathroomLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </label>

        <label>
          Description of Issue
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the issue"
            required
          />
        </label>

        <label>
          Urgency Level
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <label>
          Upload Picture (optional)
          <input type="file" name="picture" onChange={handleChange} />
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

