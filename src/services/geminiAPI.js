import axios from "axios";

const backendBaseUrl = import.meta.env.VITE_APP_BACKEND_URL;

export const sendMessageToGemini = async (prompt) => {
  try {
    const response = await axios.post(`${backendBaseUrl}/api/chats/ask`, { prompt });
    return response.data.response;
  } catch (error) {
    console.error("❌ Error di frontend saat panggil backend:", error);
    if (error.response) {
      console.error("Data:", error.response.data);
      console.error("Status:", error.response.status);
      console.error("Headers:", error.response.headers);
      throw new Error(error.response.data.error || "Terjadi kesalahan di server.");
    } else if (error.request) {
      console.error("Request:", error.request);
      throw new Error("Tidak ada respons dari server. Periksa koneksi atau URL.");
    } else {
      console.error("Message:", error.message);
      throw new Error("Terjadi kesalahan saat mengirim permintaan.");
    }
  }
};
