import { useNavigate } from "react-router-dom";
import "./headerAddBathroom.css";

export default function BrowseHeader({ count }) {
  const navigate = useNavigate();

  return (
    <header className="browse-header">
      <button
        className="back-button"
        onClick={() => navigate("/")}>
        ←
      </button>

      <div className="header-text">
        <h1>Add Bathroom</h1>
        <p>Add a restroom and detailed ratings for Warrior Thrones.</p>
      </div>
    </header>
  );
}
