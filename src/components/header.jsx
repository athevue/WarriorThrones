import { useState, useEffect } from "react";
import "./Header.css";

export default function Header() {
  const [showForm, setShowForm] = useState(false);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    async function fetchTotalReviews() {
      try {
        const res = await fetch("http://127.0.0.1:5001/api/reviews/count");
        const data = await res.json();
        setTotalReviews(data.count);
      } catch (err) {
        console.error("Error fetching total reviews:", err);
      }
    }

    fetchTotalReviews();
  }, []);

  return (
    <header className="header-container">
      <div className="header-top flex items-center justify-between w-full">
        <div>
          <h1 className="header-title">Warrior Thrones Test</h1>
          <p className="header-caption">Find and rate the best restrooms on campus</p>
        </div>

        <button className="header-button" onClick={() => setShowForm(true)}>
          <span className="button-icon">+</span> Add Bathroom
        </button>
      </div>

      {/* Stats section */}
      <div className="stats-section grid grid-cols-2 gap-4 mt-6 w-full">
        <div className="stats-card">
          <h2 className="stats-title">Average Rating</h2>
          <p className="stats-value">–</p>
        </div>
        
        <div className="stats-card">
          <h2 className="stats-title">Total Reviews</h2>
          <p className="stats-value">{totalReviews}</p>
        </div>
      </div>

      {/* Modal Overlay */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-xl font-bold mb-4">Add Bathroom</h2>
            <form>
              <label className="inputTextName">
                Name:
                <input type="text" className="inputText rounded" />
              </label>
              <br />
              <label className="inputTextName">
                Location:
                <input type="text" className="inputText rounded" />
              </label>

              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
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
