import { Routes, Route, useLocation } from "react-router-dom"; 
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Chatbot from "./pages/Chatbot";
import Login from "./pages/Login";
import Register from "./pages/Register"; 
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const noHeaderFooterPaths = ['/login', '/register'];
  const showHeaderFooter = !noHeaderFooterPaths.includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Navbar />}
      
      <div className={showHeaderFooter ? "py-8" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
        </Routes>
      </div>
      
      {showHeaderFooter && <Footer />}
    </>
  );
}

export default App;