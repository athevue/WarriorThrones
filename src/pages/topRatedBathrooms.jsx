import { useNavigate } from "react-router-dom";

export default function TopRatedBathrooms() {
    const navigate = useNavigate();
    return (
      <div className="">
        <h1>Top Rated Bathrooms Page</h1>
        <button onClick={() => navigate('/')}>home</button>
      </div>
    );
  }


