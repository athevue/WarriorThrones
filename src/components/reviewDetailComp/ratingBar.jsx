import React from "react";
import "./ratingBar.css";

export default function RatingBar({ label, rating, maxRating = 5 }) {
  const percentage = (rating / maxRating) * 100;

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "rating-success";
    if (rating >= 4.0) return "rating-warning";
    if (rating >= 3.5) return "rating-warning";
    return "rating-destructive";
  };

  const getProgressColor = (rating) => {
    if (rating >= 4.5) return "progress-success";
    if (rating >= 4.0) return "progress-warning";
    if (rating >= 3.5) return "progress-warning";
    return "progress-destructive";
  };

  return (
    <div className="rating-bar">
      <div className="rating-bar-label">
        <span className="label-text">{label}</span>
        <span className={`rating-number ${getRatingColor(rating)}`}>
          {rating.toFixed(1)}
        </span>
      </div>
      <div className="progress-container">
        <div className={`progress-fill ${getProgressColor(rating)}`} 
             style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
