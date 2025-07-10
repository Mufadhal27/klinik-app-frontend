import axios from "axios";

const backendBaseUrl = import.meta.env.VITE_APP_BACKEND_URL;

export const getAllServices = async () => {
  try {
    const response = await axios.get(`${backendBaseUrl}/api/service`);
    return response.data;
  } catch (error) {
    console.error("❌ Gagal mengambil layanan:", error);
    throw error;
  }
};

export const createService = async (data) => {
  try {
    const response = await axios.post(`${backendBaseUrl}/api/service`, data);
    return response.data;
  } catch (error) {
    console.error("❌ Gagal membuat layanan:", error);
    throw error;
  }
};

export const updateService = async (id, data) => {
  try {
    const response = await axios.put(`${backendBaseUrl}/api/service/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`❌ Gagal mengupdate layanan ID: ${id}`, error);
    throw error;
  }
};

export const deleteService = async (id) => {
  try {
    const response = await axios.delete(`${backendBaseUrl}/api/service/${id}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Gagal menghapus layanan ID: ${id}`, error);
    throw error;
  }
};