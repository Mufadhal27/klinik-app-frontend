import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BookingForm from "../components/BookingForm";

function Booking() {
  const navigate = useNavigate();
  const { isLoggedIn, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn) {
        // Pastikan baris alert ini yang Anda miliki sekarang
        alert('Anda harus login terlebih dahulu untuk mengakses halaman ini.');
        navigate('/login');
      }
    }
  }, [isLoggedIn, loading, navigate]);

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

        <BookingForm />

        <p className="text-sm text-gray-500 text-center mt-6">
          Butuh bantuan? Hubungi kami melalui WhatsApp atau datang langsung ke klinik Medisia terdekat.
        </p>
      </div>
    </section>
  );
}

export default Booking;