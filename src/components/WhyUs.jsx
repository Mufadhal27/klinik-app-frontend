import { FaUserMd, FaHospital, FaClock, FaHeartbeat } from "react-icons/fa";

function WhyUs() {
  const items = [
    {
      icon: <FaUserMd className="text-3xl text-emerald-600" />,
      title: "Dokter Berpengalaman",
      desc: "Tim kami terdiri dari dokter-dokter profesional dan ramah yang siap memberikan pelayanan terbaik."
    },
    {
      icon: <FaHospital className="text-3xl text-emerald-600" />,
      title: "Fasilitas Modern",
      desc: "Klinik dilengkapi dengan teknologi dan fasilitas medis terkini demi kenyamanan dan akurasi diagnosis."
    },
    {
      icon: <FaClock className="text-3xl text-emerald-600" />,
      title: "Cepat & Efisien",
      desc: "Proses pemeriksaan hingga pengobatan dilakukan dengan cepat tanpa mengurangi kualitas layanan."
    },
    {
      icon: <FaHeartbeat className="text-3xl text-emerald-600" />,
      title: "Pelayanan Humanis",
      desc: "Kami memprioritaskan kenyamanan pasien dengan pendekatan yang empatik dan penuh perhatian."
    },
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-emerald-700">Kenapa Memilih Medisia?</h2>
        <p className="text-gray-600 mt-2">Kami hadir untuk memberikan layanan kesehatan terbaik bagi Anda dan keluarga.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition duration-200"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyUs;
