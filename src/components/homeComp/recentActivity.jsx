import { useEffect, useState } from "react";
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
    <div className="recent-activity">
      <h2 className="recent-title">Recent Activity</h2>

      {error && <p className="error">{error}</p>}

      {activity.map((item, index) => (
        <div key={index} className="activity-card">
          <div className="activity-left">
            <strong>{item.building}</strong>
            <div className="activity-time">
              {timeAgo(item.createdAt)}
            </div>
          </div>

          <div className="activity-rating">
            {item.rating}
            <span className="star">★</span>
          </div>
        </div>
      ))}
    </div>
  );
}
