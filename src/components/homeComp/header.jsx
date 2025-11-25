import { useState, useEffect } from "react";
import "./Header.css";

// Hiding internal data and controlling how that data is being accessed
// This code shows encapsulation because total reviews is private to the component
// and can only be changed through fetchTotalReviews, preventing outside code 
// from directly accessing or modifying it.
export default function Header() {
  const [showForm, setShowForm] = useState(false);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {

    // fetch total reviews
    async function fetchTotalReviews() {
      try {
        const res = await fetch("http://127.0.0.1:5001/api/reviews/count");
        const data = await res.json();
        setTotalReviews(data.count);
      } catch (err) {
        console.error("Error fetching total reviews:", err);
      }
    }

    // fetch average rating
    async function fetchAverageRating() {
        try {
          const res = await fetch("http://127.0.0.1:5001/api/reviews/average")
          const data = await res.json();
          setAverageRating(data.averageRating.toFixed(2));
        } catch (err) {
          console.error("Error fetching average rating:", err);
        }
    }
    fetchTotalReviews();
    fetchAverageRating();

  }, []);

  return (
    <header className="header-container">
      <div className="header-top">
        <div>
          <h1 className="header-title">Warrior Thrones</h1>
          <p className="header-caption">Find and rate the best restrooms on campus</p>
        </div>

        <button className="header-button" onClick={() => setShowForm(true)}>
          <span className="button-icon">+</span> Add Bathroom
        </button>
      </div>

      {/* Stats section */}
      <div className="stats-section">
        <div className="stats-card">
          <h2 className="stats-title">Average Rating</h2>
          <p className="stats-value">{averageRating}</p>
        </div>
        
        <div className="stats-card">
          <h2 className="stats-title">Total Reviews</h2>
          <p className="stats-value">{totalReviews}</p>
        </div>
      </div>

      {/* Modal Overlay */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl">Add Bathroom</h2>
            <form>
              <label className="inputTextName">
                Name:
                <input type="text" className="inputText" />
              </label>
              <br />
              <label className="inputTextName">
                Location:
                <input type="text" className="inputText" />
              </label>

              <div className="flex">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
