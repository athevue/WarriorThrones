import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./recentActivity.css";

const API_URL = "http://localhost:5001/api/reviews/recent";

function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const seconds = Math.floor((now - past) / 1000);

  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? "s" : ""} ago`;
}

export default function RecentActivity() {
  const [activity, setActivity] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchActivity() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to load activity");
        const data = await res.json();
        setActivity(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchActivity();
  }, []);

  return (
    <div className="recentSection">
      <h2 className="recent-title">Recent Ratings</h2>
      <div className="recent-activity">

      {error && <p className="error">{error}</p>}

      {activity.map((bathroom, index) => (

        // Wrap each activity card in its own Link
        <Link
        to={`/reviewDetail/${bathroom.id}`} // use bathroom.id from API
        key={bathroom.id}
        className="activity-link"
      >
        <div className="activity-card">
          <div className="activity-left">
            <strong>{bathroom.building}</strong>
            <div className="activity-time">{timeAgo(bathroom.createdAt)}</div>
          </div>

          <div className="activity-rating">
            {bathroom.rating}
            <span className="star">★</span>
          </div>
        </div>
      </Link>
      ))}
    </div>

    </div>
    
  );
}
