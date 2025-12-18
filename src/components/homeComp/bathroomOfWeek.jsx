import { useEffect, useState } from "react";
import BathroomCard from "./bathroomCard";
import "./bathroomOfWeek.css";

const API_BASE_URL = "http://localhost:5001/api/reviews";

export default function BathroomOfWeek() {
  const [bathroom, setBathroom] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRandomBathroom() {
      try {
        const res = await fetch(`${API_BASE_URL}/random`);
        if (!res.ok) throw new Error("Failed to fetch bathroom of the week");

        const data = await res.json();
        setBathroom(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchRandomBathroom();
  }, []);

  if (error) {
    return <p className="bow-error">{error}</p>;
  }

  if (!bathroom) {
    return <p className="bow-loading">Loading Bathroom of the Week…</p>;
  }

  return (
    <div className = "weekSection">
      <h2 className="weekTitle">Bathroom of the Week</h2>
      <div className="bow-container">
        <BathroomCard
          name={bathroom.name}
          rating={bathroom.averageRating}
          location={bathroom.building}
          numReviews={1}
        />
      </div>

    </div>
    
  );
}