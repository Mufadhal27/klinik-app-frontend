import axios from "axios";

// Pastikan ini ambil dari .env
const backendBaseUrl = import.meta.env.VITE_APP_BACKEND_URL;
console.log("DEBUG: backendBaseUrl yang digunakan:", backendBaseUrl);

export async function sendMessageToGemini(prompt) {
  try {
    const response = await axios.post(`${backendBaseUrl}/api/chat`, { prompt }); 
    return response.data.response;
  } catch (err) {
    console.error("❌ Error di frontend saat panggil backend:", err);
    console.log("Data:", err.response?.data);
    console.log("Status:", err.response?.status);
    console.log("Headers:", err.response?.headers);
    throw new Error("Terjadi kesalahan di server.");
  }
}