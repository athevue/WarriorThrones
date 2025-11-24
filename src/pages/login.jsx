import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    return (
      <div className="">
        <h1>Login Page</h1>
        <button onClick={() => navigate('/')}>Home</button>
      </div>
    );
  }