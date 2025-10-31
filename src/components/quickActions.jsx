import "./quickActions.css";
import { FaSearch } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineReport } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

export default function Header() {
    return (
        <div className="quickActionsSection">
            <h1>Quick Actions Section</h1>
            <div className="buttons">
                <button className="quick-button">
                    <span className="button-icon"><FaSearch /></span> Browse Bathrooms
                </button>
                <button className="quick-button">
                    <span className="button-icon"><IoMdAdd /></span> Add Bathroom
                </button>
                <button className="quick-button">
                    <span className="button-icon"><FaRegStar /></span> Top Rated Bathrooms
                </button>
                <button className="quick-button">
                    <span className="button-icon"><MdOutlineReport /></span> Report Bathroom
                </button>
            </div>
            
        </div>
    );
}