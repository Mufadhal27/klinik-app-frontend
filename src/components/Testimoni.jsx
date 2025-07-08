import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import { FaStar } from "react-icons/fa";

function Testimoni() {
  const testimonials = [
    {
      nama: "Ahmad R.",
      komentar:
        "Pelayanan di Medisia sangat ramah dan cepat. Dokternya menjelaskan dengan jelas dan tidak terburu-buru.",
      foto: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      nama: "Lestari W.",
      komentar:
        "Tempatnya bersih dan nyaman. Proses booking juga mudah. Saya pasti akan kembali ke sini kalau butuh layanan medis.",
      foto: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      nama: "Budi S.",
      komentar:
        "Dokternya sangat profesional. Saya merasa sangat terbantu saat periksa di sini. Sukses terus untuk Medisia!",
      foto: "https://randomuser.me/api/portraits/men/74.jpg",
    },
  ];

  return (
    <section className="bg-emerald-50 py-20 px-6 md:px-20">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-emerald-700">Apa Kata Pasien Kami</h2>
        <p className="text-gray-600 mt-2">
          Testimoni dari mereka yang sudah merasakan layanan Medisia.
        </p>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={40}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 6000 }}
        loop
        className="max-w-3xl mx-auto"
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 1 }}
              className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center text-center transition hover:shadow-2xl duration-300"
            >
              <img
                src={item.foto}
                alt={item.nama}
                className="w-24 h-24 rounded-full object-cover mb-5 border-4 border-emerald-300"
              />
              <div className="flex text-yellow-400 mb-3">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <FaStar key={i} />
                  ))}
              </div>
              <p className="italic text-gray-700 mb-6 text-lg leading-relaxed max-w-xl">
                "{item.komentar}"
              </p>
              <p className="text-base font-semibold text-emerald-600">– {item.nama}</p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx>{`
        .swiper-button-next,
        .swiper-button-prev {
            background-color: #059669; /* emerald-600 */
            color: white;
            width: 42px;
            height: 42px;
            border-radius: 9999px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s ease;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
            background-color: #047857; /* emerald-700 */
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
            font-size: 16px;
            font-weight: bold;
        }
        `}</style>

    </section>
  );
}

export default Testimoni;
