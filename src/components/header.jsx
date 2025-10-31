import { useState } from "react";
import "./Header.css";

export default function Header() {
  const [showForm, setShowForm] = useState(false);

  return (
    <header className="header-container">
      {/* Top row: title + caption (left) and button (right) */}
      <div className="header-top flex items-center justify-between w-full">
        <div>
          <h1 className="header-title">Warrior Thrones</h1>
          <p className="header-caption">
            Find and rate the best restrooms on campus
            {/* find your relief */}
          </p>
        </div>

        <button
          className="header-button"
          onClick={() => setShowForm(true)}
        >
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
          <p className="stats-value">–</p>
        </div>
      </div>

      {/* Modal Overlay */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-xl font-bold mb-4">Add Bathroom</h2>
            <form>
              <label className="block mb-3">
                Name:
                <input type="text" className="border p-1 ml-2 rounded" />
              </label>
              <br></br>
              <label className="block mb-3">
                Location:
                <input type="text" className="border p-1 ml-2 rounded" />
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
