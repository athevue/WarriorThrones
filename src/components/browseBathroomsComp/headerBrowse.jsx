import { useNavigate } from "react-router-dom";
import "./headerBrowse.css";

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
        <h1>Browse Bathrooms</h1>
        <p>{count} bathrooms found</p>
      </div>

      <button 
        className="add-bathroom-button"
        onClick={() => navigate("/addBathroom")}>
        + Add Bathroom
      </button>
    </header>
  );
}
