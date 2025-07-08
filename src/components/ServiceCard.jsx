import { FaStethoscope, FaTooth, FaHeartbeat, FaUserNurse } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ServiceCard({ service }) {
  const navigate = useNavigate();

  const iconMap = {
    "Konsultasi Umum": <FaStethoscope className="text-4xl text-emerald-600" />,
    "Pemeriksaan Gigi": <FaTooth className="text-4xl text-emerald-600" />,
    "Pemeriksaan Jantung": <FaHeartbeat className="text-4xl text-emerald-600" />,
    "Cek Gula Darah": <FaHeartbeat className="text-4xl text-emerald-600" />,
    "Imunisasi Anak": <FaUserNurse className="text-4xl text-emerald-600" />,
    "Tes Kehamilan": <FaUserNurse className="text-4xl text-emerald-600" />,
    "Tes Urin Lengkap": <FaHeartbeat className="text-4xl text-emerald-600" />,
    "Tes Darah Lengkap": <FaHeartbeat className="text-4xl text-emerald-600" />,
    "Konsultasi Dokter Spesialis": <FaStethoscope className="text-4xl text-emerald-600" />,
    "Pemeriksaan Demam Berdarah": <FaHeartbeat className="text-4xl text-emerald-600" />,
    "Tes Kolesterol": <FaHeartbeat className="text-4xl text-emerald-600" />,
    "Pemeriksaan Anak Sehat": <FaUserNurse className="text-4xl text-emerald-600" />,
  };

  const handleBooking = () => {
    // Redirect ke /booking dengan query param
    navigate(`/booking?layanan=${encodeURIComponent(service.nama)}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 border border-transparent hover:border-emerald-500 group">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-4 bg-emerald-100 rounded-full shadow-inner transition-transform duration-300 group-hover:scale-110">
          {iconMap[service.nama] || <FaStethoscope className="text-4xl text-emerald-600" />}
        </div>
        <h3 className="text-2xl font-semibold text-emerald-700">{service.nama}</h3>
      </div>

      <p className="text-gray-600 mb-4 leading-relaxed">{service.deskripsi}</p>

      <div className="flex justify-between items-center">
        <span className="text-emerald-600 font-bold text-lg">
          Rp {service.harga.toLocaleString()}
        </span>
        <button
          onClick={handleBooking}
          className="px-5 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-md hover:from-emerald-600 hover:to-emerald-700 transition"
        >
          Booking
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
