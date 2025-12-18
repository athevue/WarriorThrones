import Home from "./pages/home";
import BrowseBathrooms from "./pages/browseBathrooms";
import TopRatedBathrooms from "./pages/topRatedBathrooms";
import AddBathroom from "./pages/addBathroom";
import ReportBathroom from "./pages/reportBathroom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AuthWrapper from "./components/authwrapper/authwrapper";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browseBathrooms" element={<BrowseBathrooms />} />
          <Route path="/topRatedBathrooms" element={<TopRatedBathrooms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
          path="/dashboard"
          />
            <Route
              path="/reportBathroom"
              element={
                <AuthWrapper>
                  <ReportBathroom />
                </AuthWrapper>
              }
            />
            <Route
              path="/addBathroom"
              element={
                <AuthWrapper>
                  <AddBathroom />
                </AuthWrapper>
              }
            />
          
       

        
          
          </Routes>
      </div>
    </Router>
  );
}

export default App;