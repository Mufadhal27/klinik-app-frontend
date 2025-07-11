import api from './axiosConfig'; 


export async function sendMessageToGemini(prompt) {
  try {
    // Gunakan instance `api` untuk mengirim POST request
    // Endpoint menjadi `/chat` karena baseURL di `axiosConfig.js` sudah mencakup `/api`
    const response = await api.post('api/chat', { prompt }); 
    return response.data.response;
  } catch (err) {
    console.error("❌ Error di frontend saat panggil backend:", err);
    console.log("Data:", err.response?.data);
    console.log("Status:", err.response?.status);
    console.log("Headers:", err.response?.headers);
    throw new Error("Terjadi kesalahan di server.");
  }
}