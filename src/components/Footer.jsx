import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-emerald-700 text-white py-10 px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Medisia Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl font-semibold">Medisia.</span>
        </div>

        <div className="flex gap-6">
          <Link to="/" className="transition hover:text-emerald-300">Home</Link>
          <Link to="/services" className="transition hover:text-emerald-300">Layanan</Link>
          <Link to="/booking" className="transition hover:text-emerald-300">Booking</Link>
          <Link to="/chatbot" className="transition hover:text-emerald-300">Tanya Sehat</Link>
        </div>
      </div>

      <p className="text-center text-sm text-emerald-100 mt-6">
        &copy; {new Date().getFullYear()} Medisia. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
