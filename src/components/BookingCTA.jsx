import { Link } from "react-router-dom";

function BookingCTA() {
  return (
    <section className="bg-emerald-700 py-16 text-white text-center px-6 md:px-20">
      <div className="max-w-4xl mx-auto space-y-5">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          Siap Menjaga Kesehatan Anda Bersama Medisia?
        </h2>
        <p className="text-lg text-emerald-100">
          Booking sekarang untuk konsultasi dengan dokter profesional kami dan dapatkan pelayanan terbaik dari Medisia.
        </p>
        <Link
          to="/booking"
          className="inline-block bg-white text-emerald-700 px-6 py-3 rounded-full font-semibold hover:bg-emerald-100 transition"
        >
          Booking Sekarang
        </Link>
      </div>
    </section>
  );
}

export default BookingCTA;
