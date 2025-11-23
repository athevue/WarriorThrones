import { useNavigate } from "react-router-dom"

export default function ReportBathroom() {
    const navigate = useNavigate();
    return (
        <div className="">
            <h1>Report Bathroom Page</h1>   
            <button onClick={() => navigate('/')}>Home</button>
        </div>
    )
}