import { useNavigate } from "react-router-dom"
import ReportForm from "../components/reportBathroomComp/ReportForm";

export default function ReportBathroom() {
    const navigate = useNavigate();
    return (
        <div className="">
            <h1>Report Bathroom Page</h1>   
            <button onClick={() => navigate('/')}>Home</button>
            <ReportForm />
        </div>
    )
}