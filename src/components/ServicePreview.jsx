import { Link } from "react-router-dom";
import { FaStethoscope, FaTooth, FaSyringe, FaMicroscope } from "react-icons/fa";

function ServicePreview() {
  return (
    <section className="bg-gray-100 py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* Ilustrasi Ikon */}
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-6 text-emerald-700 text-5xl justify-center">
          <div className="flex flex-col items-center">
            <FaStethoscope />
            <p className="text-sm mt-2 text-black">Konsultasi</p>
          </div>
          <div className="flex flex-col items-center">
            <FaTooth />
            <p className="text-sm mt-2 text-black">Gigi</p>
          </div>
          <div className="flex flex-col items-center">
            <FaSyringe />
            <p className="text-sm mt-2 text-black">Vaksin</p>
          </div>
          <div className="flex flex-col items-center">
            <FaMicroscope />
            <p className="text-sm mt-2 text-black">Laboratorium</p>
          </div>
        </div>

        {/* Deskripsi dan CTA */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-emerald-700">Layanan Kesehatan Terbaik</h2>
          <p className="text-gray-700">
            Klinik Medisia menyediakan layanan medis seperti konsultasi umum, perawatan gigi, vaksinasi, dan
            pemeriksaan laboratorium. Semua layanan ditangani oleh tenaga profesional dengan fasilitas modern.
          </p>
          <Link
            to="/services"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-full transition"
          >
            Lihat Semua Layanan →
          </Link>
        </div>

      </div>
    </section>
  );
}

export default ServicePreview;
