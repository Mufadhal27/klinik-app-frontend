import api from './axiosConfig'; 


export const getAllServices = async () => {
  try {
    // Gunakan instance `api` yang sudah diatur baseURL-nya
    // Endpoint menjadi `/service` karena baseURL sudah mencakup `/api`
    const response = await api.get('api/service');
    return response.data;
  } catch (error) {
    console.error("❌ Gagal mengambil layanan:", error.response?.data || error.message);
    throw error;
  }
};

export const createService = async (data) => {
  try {
    // Gunakan instance `api` untuk mengirim POST request
    const response = await api.post('/service', data);
    return response.data;
  } catch (error) {
    console.error("❌ Gagal membuat layanan:", error.response?.data || error.message);
    throw error;
  }
};

export const updateService = async (id, data) => {
  try {
    // Gunakan instance `api` untuk mengirim PUT request
    const response = await api.put(`/service/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`❌ Gagal mengupdate layanan ID: ${id}`, error.response?.data || error.message);
    throw error;
  }
};

export const deleteService = async (id) => {
  try {
    // Gunakan instance `api` untuk mengirim DELETE request
    const response = await api.delete(`/service/${id}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Gagal menghapus layanan ID: ${id}`, error.response?.data || error.message);
    throw error;
  }
};