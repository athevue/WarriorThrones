import { useNavigate } from "react-router-dom";
import "./headerTopRated.css";
import { IoLocationOutline } from "react-icons/io5";

export default function BrowseHeader( {buildingName, room} ) {
  const navigate = useNavigate();

  return (
    <header className="browse-header">
      <button
        className="back-button"
        onClick={() => navigate(-1)}>
        ←
      </button>


      <div className="header-text">
        <h1>Top Rated Bathrooms</h1>
        <p> <IoLocationOutline /> The top 5 rated bathrooms across campus.</p>
      </div>

      {/* <button 
        className="add-bathroom-button"
        onClick={() => navigate("/addBathroom")}>
        + Add
      </button> */}
    </header>
  );
}
