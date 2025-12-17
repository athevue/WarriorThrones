import { useNavigate } from "react-router-dom";
import "./headerReviewDetail.css";
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
        <h1>{buildingName} - {room}</h1>
        <p> <IoLocationOutline /> {buildingName}</p>
      </div>

      {/* <button 
        className="add-bathroom-button"
        onClick={() => navigate("/addBathroom")}>
        + Add
      </button> */}
    </header>
  );
}
