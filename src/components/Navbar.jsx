import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const [active, setActive] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const { isLoggedIn, currentUser, logout, loading } = useAuth();

  const handleNavigate = (path) => {
    navigate(path);
    setActive(false);
  };

  const handleLogoutClick = () => {
    logout();
    setActive(false);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  if (loading) {
    return null;
  }

  return (
    <div className="bg-emerald-800 text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="navbar container mx-auto px-4 py-5 flex items-center justify-between relative">
        <div className="logo">
          <h1
            className="text-2xl font-bold flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavigate("/")}
          >
            <img src="/logo.png" alt="logo" className="w-9 h-9 object-contain" />
            Medisia.
          </h1>
        </div>

        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 z-20"
          onClick={() => setActive(!active)}
          aria-label="Toggle menu"
        >
          <span className={`block h-1 w-8 bg-white mb-1 rounded transition-all duration-300 ${active ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block h-1 w-8 bg-white mb-1 rounded transition-all duration-300 ${active ? "opacity-0" : ""}`}></span>
          <span className={`block h-1 w-8 bg-white rounded transition-all duration-300 ${active ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>

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

          {isLoggedIn ? (
            <li className="flex items-center gap-4 flex-col md:flex-row mt-4 md:mt-0 relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-lg font-semibold text-white flex items-center gap-2"
              >
                Halo, {currentUser?.username || 'User'}!
                <svg
                  className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 md:top-full mt-2 md:mt-0 w-48 bg-emerald-800 rounded-lg shadow-xl p-2 z-20">
                    <p className="text-gray-800 text-sm font-medium px-2 py-1 mb-2">
                        {currentUser?.username || 'User'}
                    </p>
                    <button
                        onClick={handleLogoutClick}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 w-full text-center"
                    >
                        Logout
                    </button>
                </div>
              )}
            </li>
          ) : (
            <>
              <li className="w-full md:w-auto mt-4 md:mt-0">
                <button
                  onClick={() => handleNavigate("/login")}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75 w-full md:w-auto"
                >
                  Login
                </button>
              </li>
              <li className="w-full md:w-auto mt-2 md:mt-0">
                <button
                  onClick={() => handleNavigate("/register")}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 w-full md:w-auto"
                >
                  Register
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;