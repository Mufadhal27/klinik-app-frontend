import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BookingForm from "../components/BookingForm";
import { getAllBookings, updateBooking, deleteBooking } from "../utils/bookingAPI";

function Booking() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const isLoggedIn = user !== null;

  const [userBookings, setUserBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [formKey, setFormKey] = useState(0);

  const fetchUserBookings = async () => {
    if (isLoggedIn && user?.id) {
      try {
        const allBookings = await getAllBookings(); // ✅ SUDAH DIBENARKAN
        const filteredBookings = allBookings.filter(
          booking => booking.userId === user.id
        );
        setUserBookings(filteredBookings);
      } catch (error) {
        console.error("Gagal mengambil riwayat booking:", error);
      }
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn) {
        alert('Anda harus login terlebih dahulu untuk mengakses halaman ini.');
        navigate('/login');
      } else {
        fetchUserBookings();
      }
    }
  }, [isLoggedIn, loading, navigate, user?.id]);

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setFormKey(prevKey => prevKey + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (bookingId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus booking ini?')) {
      try {
        await deleteBooking(bookingId);
        alert('Booking berhasil dihapus!');
        fetchUserBookings();
      } catch (error) {
        console.error("Gagal menghapus booking:", error);
        alert('Gagal menghapus booking. Silakan coba lagi.');
      }
    }
  };

  const handleBookingFormSubmitSuccess = () => {
    setEditingBooking(null);
    setFormKey(prevKey => prevKey + 1);
    fetchUserBookings();
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-50">
        <div>Memuat...</div>
      </section>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <section className="min-h-screen px-6 md:px-20 py-24 bg-slate-50">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-4xl font-bold text-center text-emerald-700 mb-4">
          Form Booking
        </h1>

        <p className="text-center text-gray-600 mb-8 leading-relaxed">
          Isi formulir di bawah ini untuk membuat janji temu dengan tenaga medis kami. Tim kami akan segera menghubungi Anda untuk konfirmasi lebih lanjut.
        </p>

        <BookingForm
          key={formKey}
          initialData={editingBooking}
          onBookingSuccess={handleBookingFormSubmitSuccess}
        />

        <p className="text-sm text-gray-500 text-center mt-6">
          Butuh bantuan? Hubungi kami melalui WhatsApp atau datang langsung ke klinik Medisia terdekat.
        </p>

        <h2 className="text-3xl font-bold text-center text-emerald-700 mt-12 mb-6">
          Riwayat Booking Anda
        </h2>

        {userBookings.length === 0 ? (
          <p className="text-center text-gray-600">Anda belum memiliki booking.</p>
        ) : (
          <div className="space-y-4">
            {userBookings.map((booking) => (
              <div
                key={booking._id}
                className="p-4 border rounded-lg shadow-sm bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div className="flex-grow">
                  <p className="font-semibold text-lg text-emerald-800">
                    {booking.serviceName}
                  </p>
                  <p className="text-gray-700">
                    Tanggal: {new Date(booking.bookingDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">Jam: {booking.bookingTime}</p>
                  <p className="text-gray-700">
                    Status:{' '}
                    <span
                      className={`font-medium ${
                        booking.status === 'pending'
                          ? 'text-orange-600'
                          : booking.status === 'confirmed'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </p>
                  {booking.notes && (
                    <p className="text-gray-600 text-sm italic">
                      Catatan: {booking.notes}
                    </p>
                  )}
                </div>
                <div className="mt-4 md:mt-0 md:ml-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(booking)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Booking;
