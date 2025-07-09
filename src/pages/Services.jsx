import React, { useEffect, useState } from "react";
import { getAllServices } from "../utils/serviceAPI";
import ServiceCard from "../components/ServiceCard";

function Services() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getAllServices();
        console.log("DEBUG: Data dari API:", data);

        if (Array.isArray(data)) {
          setServices(data);
        } else {
          console.warn("❗ Data layanan bukan array:", data);
          setError("Format data layanan tidak sesuai.");
        }

      } catch (err) {
        console.error("❌ Gagal mengambil layanan:", err);
        if (err.response) {
          setError(`Gagal ambil layanan: ${err.response.data.error || err.response.statusText}`);
        } else if (err.request) {
          setError("❌ Tidak ada respons dari server. Periksa URL backend.");
        } else {
          setError("❌ Terjadi kesalahan internal.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (isLoading) {
    return (
      <section className="min-h-screen px-6 md:px-20 py-24 bg-slate-50 flex justify-center items-center">
        <p className="text-xl text-gray-700">Memuat layanan...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen px-6 md:px-20 py-24 bg-slate-50 flex justify-center items-center">
        <p className="text-xl text-red-600">Error: {error}</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-6 md:px-20 py-24 bg-slate-50">
      <h2 className="text-5xl font-extrabold text-center text-emerald-800 mb-12">
        Layanan Kami
      </h2>
      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
        Kami menyediakan berbagai layanan medis profesional untuk memenuhi kebutuhan kesehatan Anda.
        Pilih layanan yang Anda butuhkan dan jadwalkan janji temu dengan mudah.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.length > 0 ? (
          services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-700 text-lg">
            Tidak ada layanan yang tersedia saat ini.
          </p>
        )}
      </div>
    </section>
  );
}

export default Services;
