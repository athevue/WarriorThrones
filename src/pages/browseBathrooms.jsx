import { useNavigate } from "react-router-dom";
import BrowseCard from "../components/browseBathroomsComp/browseCard";

export default function BrowseBathrooms() {
    const navigate = useNavigate();
    return (
      <div className="">
        <h1>Browse Bathrooms Page</h1>
        <button onClick={() => navigate('/')}>Home</button>
        <BrowseCard />
      </div>
    );
  }
  