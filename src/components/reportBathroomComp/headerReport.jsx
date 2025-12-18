import { useNavigate } from "react-router-dom";
import "./headerReport.css";

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
        <h1>Report Bathroom</h1>
        <p>Report any accidents, slippery floors, or hazards!</p>
      </div>

      
    </header>
  );
}
