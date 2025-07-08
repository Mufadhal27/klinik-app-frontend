import React, { useState } from "react";
import { sendMessageToGemini } from "../services/geminiAPI"; // Pastikan path ini benar

function Chatbot() {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMsg = { from: "user", text: input };
    setChat((prev) => [...prev, newUserMsg]);
    setInput("");
    setLoading(true);

    try {
      const botReply = await sendMessageToGemini(input);
      setChat((prev) => [...prev, { from: "bot", text: botReply }]);
    } catch (err) {
      console.error("❌ Error di frontend saat panggil backend:", err);
      const errorMessage = err.response && err.response.data && err.response.data.error
                           ? err.response.data.error
                           : err.message || "Gagal mendapatkan jawaban dari server.";
      setChat((prev) => [...prev, { from: "bot", text: `❌ ${errorMessage}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen px-6 md:px-20 py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-700 mb-6 text-center">Tanya Sehat</h1>
        <p className="text-center text-gray-600 mb-10">
          Tanyakan keluhan kesehatan Anda, dan dapatkan jawaban langsung dari AI Medisia.
        </p>

        <div className="space-y-4 bg-white rounded-xl p-6 shadow">
          {chat.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-xl text-sm whitespace-pre-line ${
                  msg.from === "user"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {msg.from === "bot" ? (
                  <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}

          {loading && <div className="text-gray-500 text-sm italic">Mengetik...</div>}
        </div>

        <div className="flex mt-6 gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ketik keluhan kesehatan Anda..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
            disabled={loading} // Menonaktifkan input saat loading
          />
          <button
            onClick={handleSend}
            className="px-5 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition disabled:opacity-50"
            disabled={loading} // Menonaktifkan tombol saat loading
          >
            Kirim
          </button>
        </div>
      </div>
    </section>
  );
}

export default Chatbot;
