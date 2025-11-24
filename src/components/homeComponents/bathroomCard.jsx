import React from "react";
import "./BathroomCard.css";

export default function BathroomCard({ name, rating, location, numReviews }) {
    return (
        <div className="bathroom-card">
            <h2 className="bathroom-name">{name}</h2>
            <p className="bathroom-rating">Rating: {rating} ⭐</p>
            <p className="bathroom-location">Location: {location}</p>
            <p className="bathroom-reviews">{numReviews} Reviews</p>
        </div>
    );
}