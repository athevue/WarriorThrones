import "./quickActions.css";
import { FaSearch } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineReport } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    return (
        <div className="quickActionsSection">
            <h1>Quick Actions Section</h1>
            <div className="buttons">
                <button className="quick-button" onClick={() => navigate('/browseBathrooms')}>
                    <span className="button-icon"><FaSearch /></span>
                    <span className="button-text">Browse Bathrooms</span>
                </button>
                <button className="quick-button" onClick={() => navigate('/addBathroom')}>
                    <span className="button-icon"><IoMdAdd /></span> Add Bathroom
                </button>
                <button className="quick-button" onClick={() => navigate('/topRatedBathrooms')}>
                    <span className="button-icon"><FaRegStar /></span> Top Rated Bathrooms
                </button>
                <button className="quick-button" onClick={() => navigate('/reportBathroom')}>
                    <span className="button-icon"><MdOutlineReport /></span> Report Bathroom
                </button>
            </div>
            
        </div>
    );
}