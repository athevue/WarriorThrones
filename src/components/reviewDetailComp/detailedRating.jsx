import React from "react";
import RatingBar from "./ratingBar";
import "./detailedRating.css";

export default function DetailedRatings({ review, loading }) {
  if (loading || !review) {
    return (
      <div className="detailed-ratings-card">
        <p className="skeleton-bar" />
        <p className="skeleton-bar" />
        <p className="skeleton-bar" />
      </div>
    );
  }

  return (
    <div className="detailed-ratings-card">
      <h2 className="detailed-ratings-title">Detailed Ratings</h2>
      <RatingBar label="Cleanliness" rating={review.cleanliness_1_10 ?? 0} maxRating={10} />
      <RatingBar label="Lighting" rating={review.lighting_1_10 ?? 0} maxRating={10} />
      <RatingBar label="Traffic" rating={review.traffic_1_10 ?? 0} maxRating={10} />
      <RatingBar label="Sink Water Pressure" rating={review.sink_water_pressure_1_10 ?? 0} maxRating={10} />
      <RatingBar label="Urinal Spacing" rating={review.urinal_spacing_privacy_male_only_1_10 ?? 0} maxRating={10} />
      <RatingBar label="Room Temperature" rating={review.room_temperature_hot_cold_1_10 ?? 0} maxRating={10} />
      <RatingBar label="Aesthetics" rating={review.aesthetics_1_10 ?? 0} maxRating={10} />
      <RatingBar label="General Noise Level" rating={review.general_noise_level_1_10 ?? 0} maxRating={10} />
      <RatingBar label="Ventilation" rating={review.ventilation_air_flow_1_10 ?? 0} maxRating={10} />
      <RatingBar label="Safe Flooring" rating={review.nonslip_floor_1_10 ?? 0} maxRating={10} />
      <RatingBar label="Privacy" rating={review.privacy_1_10 ?? 0} maxRating={10} />
      <RatingBar label="Odor" rating={review.odor_1_10 ?? 0} maxRating={10} />
    </div>
  );
}
