import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Chatbot from "./pages/Chatbot";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </div>
      <Footer />  
    </Router>
  );
}

export default App;
