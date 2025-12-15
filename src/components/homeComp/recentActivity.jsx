import { useEffect, useState } from "react";
import "./recentActivity.css";

const API_URL = "http://localhost:5001/api/reviews/recent";

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
            <div className="activity-text">
              <strong>{item.building}</strong>
            </div>
            <div className="activity-time">Just now</div>
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
