import axios from "axios";

const backendBaseUrl = import.meta.env.VITE_APP_BACKEND_URL;

// Ambil semua layanan
export const getAllServices = async () => {
  try {
    const response = await axios.get(`${backendBaseUrl}/service`);
    return response.data;
  } catch (error) {
    console.error("❌ Gagal mengambil layanan:", error);
    throw error;
  }
};

// Buat layanan baru
export const createService = async (data) => {
  try {
    const response = await axios.post(`${backendBaseUrl}/service`, data);
    return response.data;
  } catch (error) {
    console.error("❌ Gagal membuat layanan:", error);
    throw error;
  }
};

// Update layanan
export const updateService = async (id, data) => {
  try {
    const response = await axios.put(`${backendBaseUrl}/service/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`❌ Gagal mengupdate layanan ID: ${id}`, error);
    throw error;
  }
};

// Hapus layanan
export const deleteService = async (id) => {
  try {
    const response = await axios.delete(`${backendBaseUrl}/service/${id}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Gagal menghapus layanan ID: ${id}`, error);
    throw error;
  }
};
