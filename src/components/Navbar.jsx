import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setActive(false);
  };

  return (
    <div className="bg-emerald-800 text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="navbar container mx-auto px-4 py-5 flex items-center justify-between relative">
        
        {/* Logo */}
        <div className="logo">
          <h1
            className="text-2xl font-bold flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavigate("/")}
          >
            <img src="/logo.png" alt="logo" className="w-9 h-9 object-contain" />
            Medisia.
          </h1>
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 z-20"
          onClick={() => setActive(!active)}
          aria-label="Toggle menu"
        >
          <span className={`block h-1 w-8 bg-white mb-1 rounded transition-all duration-300 ${active ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block h-1 w-8 bg-white mb-1 rounded transition-all duration-300 ${active ? "opacity-0" : ""}`}></span>
          <span className={`block h-1 w-8 bg-white rounded transition-all duration-300 ${active ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>

        {/* Menu */}
        <ul
          className={`menu flex items-center gap-8 md:static fixed left-1/2 -translate-x-1/2 md:-translate-x-0 top-20 md:top-0 bg-emerald-700 md:bg-transparent w-full md:w-auto py-10 md:py-0 flex-col md:flex-row transition-all duration-300 z-10
          ${active ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} md:opacity-100 md:pointer-events-auto`}
        >
          {[
            { label: "Beranda", path: "/" },
            { label: "Layanan", path: "/services" },
            { label: "Booking", path: "/booking" },
            { label: "Tanya Sehat", path: "/chatbot" },
          ].map((item) => (
            <li key={item.path}>
              <button
                onClick={() => handleNavigate(item.path)}
                className="text-lg font-medium px-4 py-2 rounded-md transition-all duration-300 hover:bg-white/10 hover:shadow-md hover:shadow-white/30"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
