import { useState, useEffect } from "react";
import "./browseCard.css";

export default function BrowseCard() {
    const [allReviews, setAllReviews] = useState([]);

    useEffect (() => {

        // fetch total reviews
        async function fetchAllReviews() {
            try {
              const res = await fetch("http://127.0.0.1:5001/api/reviews/all");
              const data = await res.json();


              // Extract only the fields you want
            const mappedData = data.map(review => ({
                building_name: review.building_name,
                gender_type: review.gender_type,
                location_room: review.location_room,
                overall_rating: review.OverallRating
            }));

              setAllReviews(mappedData);

            } catch (err) {
              console.error("Error fetching all reviews:", err);
            }
          }
          fetchAllReviews();
        }, []); // empty dependency array to run once on mount
        console.log("All Reviews Data:", allReviews
    );

    return (
        <div className="browse-card-container">
      <h2 className="browse-card-title">All Reviews</h2>
      
      {allReviews.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="cards-wrapper">
          {allReviews.map((review, index) => (
            <div className="review-card" key={index}>
              <h3>{review.building_name}</h3>
              <p><strong>Gender:</strong> {review.gender_type}</p> 
              <p><strong>Room:</strong> {review.location_room}</p>
              <p><strong>Overall Rating:</strong> {review.overall_rating}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  
    );
}
