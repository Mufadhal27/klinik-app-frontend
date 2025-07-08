import BookingForm from "../components/BookingForm";

function Booking() {
  return (
    <section className="min-h-screen px-6 md:px-20 py-24 bg-slate-50">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8">
        {/* Judul */}
        <h1 className="text-4xl font-bold text-center text-emerald-700 mb-4">
          Form Booking
        </h1>

        {/* Subjudul / Info */}
        <p className="text-center text-gray-600 mb-8 leading-relaxed">
          Isi formulir di bawah ini untuk membuat janji temu dengan tenaga medis kami. Tim kami akan segera menghubungi Anda untuk konfirmasi lebih lanjut.
        </p>

        {/* Form */}
        <BookingForm />

        {/* Catatan Tambahan */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Butuh bantuan? Hubungi kami melalui WhatsApp atau datang langsung ke klinik Medisia terdekat.
        </p>
      </div>
    </section>
  );
}

export default Booking;
