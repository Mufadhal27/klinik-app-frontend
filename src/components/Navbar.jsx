import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { isLoggedIn, currentUser, logout, loading } = useAuth();

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

  const handleLogoutClick = () => {
    logout();
    setIsDropdownOpen(false);
  };

  if (loading) {
    return null;
  }

  return (
    <nav className="fixed w-full top-0 left-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-emerald-600">
          Medisia
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-emerald-600 transition">Beranda</Link>
          <Link to="/services" className="text-gray-700 hover:text-emerald-600 transition">Layanan</Link>
          <Link to="/booking" className="text-gray-700 hover:text-emerald-600 transition">Booking</Link>
          <Link to="/chatbot" className="text-gray-700 hover:text-emerald-600 transition">Tanya Sehat</Link>

          {isLoggedIn && currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-emerald-600 font-semibold px-4 py-2 rounded-full border border-emerald-600 hover:bg-emerald-50 transition"
              >
                Halo, {currentUser.username}!
                <svg
                  className={`w-4 h-4 ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <button
                    onClick={handleLogoutClick}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="px-5 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition">
                Login
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;