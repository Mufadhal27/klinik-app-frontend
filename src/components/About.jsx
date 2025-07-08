function About() {
  return (
    <section className="bg-white py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* FOTO */}
        <div className="w-full md:w-1/2">
          <img
            src="/src/assets/img/about.jpeg" 
            alt="Tentang Klinik"
            className="rounded-2xl shadow-lg w-full h-auto object-cover"
          />
        </div>

        {/* TEKS */}
        <div className="w-full md:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold text-emerald-700">Tentang Medisia</h2>
          <p className="text-gray-700 text-justify">
            Medisia adalah klinik modern yang mengutamakan pelayanan cepat, nyaman, dan terpercaya.
            Kami hadir dengan dokter-dokter berpengalaman, fasilitas lengkap, serta sistem booking online
            yang memudahkan Anda mendapatkan perawatan kapan saja.
          </p>
          <p className="text-gray-600 text-justify">
            Kami percaya bahwa akses terhadap layanan kesehatan yang berkualitas adalah hak semua orang.
            Itulah mengapa Medisia hadir untuk menjadi mitra kesehatan Anda dan keluarga.
          </p>
        </div>

      </div>
    </section>
  );
}

export default About;
