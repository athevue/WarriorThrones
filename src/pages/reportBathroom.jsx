import { useNavigate } from "react-router-dom"
import ReportForm from "../components/reportBathroomComp/ReportForm";
import Header from "../components/reportBathroomComp/headerReport";

export default function ReportBathroom() {
    const navigate = useNavigate();
    return (
        <div className="">
            <Header />
            <ReportForm />
        </div>
    )
}