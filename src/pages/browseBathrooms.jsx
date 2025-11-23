import { useNavigate } from "react-router-dom";

export default function BrowseBathrooms() {
    const navigate = useNavigate();
    return (
      <div className="">
        <h1>Browse Bathrooms Page</h1>
        <button onClick={() => navigate('/')}>Home</button>
      </div>
    );
  }
  