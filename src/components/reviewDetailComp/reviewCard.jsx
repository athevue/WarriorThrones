import React from "react";
import { Star, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./reviewCard.css";


export default function ReviewCard({ review, loading }) {
  const navigate = useNavigate();

  // Convert 1-10 rating to 0-5 stars
  const starRating = review?.OverallRating
    ? Math.round(review.OverallRating / 2)
    : 0;

  const getRatingColor = (rating) => {
    if (rating >= 8) return "#0C584F"; // Green
    if (rating >= 5) return "#FFC72C"; // Yellow
    return "#E63946";
  };

  const handleAddReview = () => {
    navigate("/addBathroom");
  };

  return (
    <div className="review-card2">
      {/* Rating + Stars */}
      <div className="review-card-heaxder">
        <div className="rating-section">
          <div
            className="rating-number"
            style={{ color: getRatingColor(review?.OverallRating) }}
          >
            {review?.OverallRating?.toFixed(1) ?? "N/A"}
          </div>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`star ${i < starRating ? "filled" : ""}`}
              />
            ))}
          </div>
          <div className="rating-label">Overall Rating</div>
          <div>Number of stalls: {review?.num_of_stalls}</div>
        </div>

        {/* Write Review Button */}
        <button className="add-review-btn" onClick={handleAddReview}>
          <MessageSquare className="icon" />
          Write Review
        </button>
      </div>

      {/* Image Placeholder */}
      {/* <div className="image-placeholder">Image Placeholder</div> */}
      {/* <img src={} alt="Logo" className="bathroom-logo"/> */}

      {/* Comments: NEED TO SPLIT AVAILABLILITY AND COMMENTSSSSSS */}
      <div className="review-comments">
        {review?.["Status/Comments"] || "No comments yet."}  
      </div>
    </div>
  );
}
