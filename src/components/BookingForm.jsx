import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { createBooking, updateBooking } from "../utils/bookingAPI";

function BookingForm({ initialData, onBookingSuccess }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const defaultLayanan = queryParams.get("layanan");

  const initialFormState = {
    nama: "",
    layanan: defaultLayanan || "",
    tanggal: "",
    jam: "",
    userEmail: "",
    userPhone: "",
    catatan: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        nama: initialData.userName || "",
        layanan: initialData.serviceName || "",
        tanggal: initialData.bookingDate ? new Date(initialData.bookingDate).toISOString().split('T')[0] : "",
        jam: initialData.bookingTime || "",
        userEmail: initialData.userEmail || "",
        userPhone: initialData.userPhone || "",
        catatan: initialData.notes || "",
      });
    } else {
      setFormData(initialFormState);
    }
    setSuccessMessage("");
    setErrorMessage("");
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (initialData && initialData._id) {
        await updateBooking(initialData._id, {
            serviceName: formData.layanan,
            bookingDate: formData.tanggal,
            bookingTime: formData.jam,
            userName: formData.nama,
            userEmail: formData.userEmail,
            userPhone: formData.userPhone,
            notes: formData.catatan,
        });
        setSuccessMessage("✅ Booking berhasil diperbarui!");
      } else {
        await createBooking(formData);
        setSuccessMessage("✅ Booking berhasil dikirim!");
      }
      setErrorMessage("");
      setFormData(initialFormState);
      
      if (onBookingSuccess) {
        onBookingSuccess();
      }

    } catch (error) {
      console.error("❌ Gagal kirim/update booking:", error);
      if (error.response) {
        setErrorMessage(`Terjadi kesalahan: ${error.response.data.error || error.response.statusText}`);
      } else if (error.request) {
        setErrorMessage("Tidak ada respons dari server. Periksa koneksi atau URL backend.");
      } else {
        setErrorMessage("Terjadi kesalahan saat menyiapkan permintaan.");
      }
      setSuccessMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {successMessage && (
        <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded shadow-sm">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded shadow-sm">
          {errorMessage}
        </div>
      )}

      <div>
        <label className="block text-gray-700 mb-1">Nama Lengkap</label>
        <input
          type="text"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Layanan</label>
        <input
          type="text"
          name="layanan"
          value={formData.layanan}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Tanggal Booking</label>
        <input
          type="date"
          name="tanggal"
          value={formData.tanggal}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Jam Kunjungan</label>
        <input
          type="time"
          name="jam"
          value={formData.jam}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="userEmail"
          value={formData.userEmail}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Nomor Telepon</label>
        <input
          type="tel"
          name="userPhone"
          value={formData.userPhone}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Catatan Tambahan</label>
        <textarea
          name="catatan"
          rows="3"
          value={formData.catatan}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
      >
        {initialData ? "Update Booking" : "Kirim Booking"}
      </button>
    </form>
  );
}

export default BookingForm;