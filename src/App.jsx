import Home from "./pages/home";
import BrowseBathrooms from "./pages/browseBathrooms";
import TopRatedBathrooms from "./pages/topRatedBathrooms";
import AddBathroom from "./pages/addBathroom";
import ReportBathroom from "./pages/reportBathroom";
import Login from "./pages/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browseBathrooms" element={<BrowseBathrooms />} />
          <Route path="/topRatedBathrooms" element={<TopRatedBathrooms />} />
          <Route path="/addBathroom" element={<AddBathroom />} />
          <Route path="/reportBathroom" element={<ReportBathroom />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;