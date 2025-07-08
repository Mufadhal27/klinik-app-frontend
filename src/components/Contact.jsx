import { FaMapMarkerAlt, FaClock, FaEnvelope, FaPhone } from "react-icons/fa";

function ContactSection() {
  return (
    <section className="bg-white py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-emerald-700">Hubungi Kami</h2>
        <p className="text-gray-600 mt-2">
          Kami siap membantu Anda. Jangan ragu untuk menghubungi Medisia kapan saja.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto text-left">
        <div className="flex items-start gap-4">
          <FaMapMarkerAlt className="text-2xl text-emerald-600" />
          <div>
            <h4 className="font-bold">Alamat</h4>
            <p>Jl. Sehat No. 123, Jakarta, Indonesia</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <FaClock className="text-2xl text-emerald-600" />
          <div>
            <h4 className="font-bold">Jam Operasional</h4>
            <p>Senin - Sabtu: 08.00 - 20.00 WIB</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <FaEnvelope className="text-2xl text-emerald-600" />
          <div>
            <h4 className="font-bold">Email</h4>
            <p>info@medisia.id</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <FaPhone className="text-2xl text-emerald-600" />
          <div>
            <h4 className="font-bold">Telepon / WA</h4>
            <p>+62 812-3456-7890</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
