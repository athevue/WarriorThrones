import { useNavigate } from "react-router-dom";
import "./headerBrowse.css";
import { Star, MessageSquare } from "lucide-react";


export default function BrowseHeader({ count }) {
  const navigate = useNavigate();

  const handleAddReview = () => {
    navigate("/addBathroom");
  };

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

      {/* <button 
        className="add-bathroom-button"
        onClick={() => navigate("/addBathroom")}>
        + Add Bathroom
      </button> */}
      <button className="add-review-btn" onClick={handleAddReview}>
          <MessageSquare className="icon" />
          Write Review
        </button>
    </header>
  );
}
