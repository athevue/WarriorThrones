import { useNavigate } from "react-router-dom";

export default function AddBathroom() {
    const navigate = useNavigate();
    return (
      <div className="">
        <h1>Add Bathroom Page</h1>
        <button onClick={() => navigate('/')}>Home</button>
      </div>
    );
  }