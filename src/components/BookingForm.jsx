import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { createBooking, updateBooking, fetchAvailability } from "../utils/bookingAPI";
import moment from "moment";

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
  const [bookedTimes, setBookedTimes] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        nama: initialData.userName || "",
        layanan: initialData.serviceName || "",
        tanggal: initialData.bookingDate ? new Date(initialData.bookingDate).toISOString().split("T")[0] : "",
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

  useEffect(() => {
    const fetchData = async () => {
      if (formData.tanggal && formData.layanan) {
        try {
          const res = await fetchAvailability(formData.tanggal, formData.layanan);
          setBookedTimes(res.bookedTimes || []);
        } catch (err) {
          console.error("❌ Gagal ambil ketersediaan:", err);
        }
      }
    };
    fetchData();
  }, [formData.tanggal, formData.layanan]);

  const isTimeDisabled = (time) => {
    const selected = moment(time, "HH:mm");
    return bookedTimes.some((booked) => {
      const bookedMoment = moment(booked, "HH:mm");
      const diff = Math.abs(selected.diff(bookedMoment, "minutes"));
      return diff <= 15;
    });
  };

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
      if (onBookingSuccess) onBookingSuccess();
    } catch (error) {
      console.error("❌ Gagal submit booking:", error);
      setErrorMessage(error.response?.data?.error || "Terjadi kesalahan.");
      setSuccessMessage("");
    }
  };

  const generateTimes = () => {
    const times = [];
    for (let h = 7; h <= 17; h++) {
      for (let m = 0; m < 60; m += 30) {
        times.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
      }
    }
    return times;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {successMessage && <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded">{successMessage}</div>}
      {errorMessage && <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded">{errorMessage}</div>}

      <div>
        <label className="block text-gray-700 mb-1">Nama Lengkap</label>
        <input type="text" name="nama" value={formData.nama} onChange={handleChange} className="w-full border px-4 py-2 rounded" required />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Layanan</label>
        <input type="text" name="layanan" value={formData.layanan} onChange={handleChange} className="w-full border px-4 py-2 rounded" required />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Tanggal Booking</label>
        <input
          type="date"
          name="tanggal"
          value={formData.tanggal}
          onChange={handleChange}
          className={`w-full border px-4 py-2 rounded ${
            formData.tanggal && new Date(formData.tanggal).getDay() === 0 ? 'text-red-500 font-semibold' : ''
          }`}
          required
        />
        {formData.tanggal && new Date(formData.tanggal).getDay() === 0 && (
          <p className="text-red-600 text-sm mt-1">Hari Minggu — Klinik tutup</p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Jam Kunjungan</label>
        <select name="jam" value={formData.jam} onChange={handleChange} className="w-full border px-4 py-2 rounded" required>
          <option value="">Pilih Jam</option>
          {generateTimes().map((time) => (
            <option key={time} value={time} disabled={isTimeDisabled(time)}>
              {time} {isTimeDisabled(time) ? "(Penuh)" : ""}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Email</label>
        <input type="email" name="userEmail" value={formData.userEmail} onChange={handleChange} className="w-full border px-4 py-2 rounded" required />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Nomor Telepon</label>
        <input type="tel" name="userPhone" value={formData.userPhone} onChange={handleChange} className="w-full border px-4 py-2 rounded" required />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Catatan Tambahan</label>
        <textarea name="catatan" rows="3" value={formData.catatan} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
      </div>

      <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded">
        {initialData ? "Update Booking" : "Kirim Booking"}
      </button>
    </form>
  );
}

export default BookingForm;
