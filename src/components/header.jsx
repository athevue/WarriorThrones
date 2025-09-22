import "./Header.css";

export default function Header() {
  return (
    <header className="header-container">
      {/* Top row: title + caption (left) and button (right) */}
      <div className="header-top flex items-center justify-between w-full">
        <div>
          <h1 className="header-title">Warrior Thrones Test</h1>
          <p className="header-caption">
            Find and rate the best restrooms on campus
          </p>
        </div>

        <button className="header-button">
          <span className="button-icon">+</span> Add Bathroom
        </button>
      </div>

      {/* Stats section below the top row */}
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
    </header>
  );
}
