import axios from "axios";

const backendBaseUrl = import.meta.env.VITE_APP_BACKEND_URL;

// ✅ Ambil semua booking
export const getAllBookings = async () => {
  const response = await axios.get(`${backendBaseUrl}/booking`);
  return response.data;
};

// ✅ Buat booking baru
export const createBooking = async (bookingData) => {
  const response = await axios.post(`${backendBaseUrl}/booking`, bookingData);
  return response.data;
};

// ✅ Update booking
export const updateBooking = async (id, updatedData) => {
  const response = await axios.put(`${backendBaseUrl}/booking/${id}`, updatedData);
  return response.data;
};

// ✅ Hapus booking
export const deleteBooking = async (id) => {
  const response = await axios.delete(`${backendBaseUrl}/booking/${id}`);
  return response.data;
};
