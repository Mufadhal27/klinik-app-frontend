import axios from "axios";

const backendBaseUrl = import.meta.env.VITE_APP_BACKEND_URL;

export const getAllBookings = async () => {
  const response = await axios.get(`${backendBaseUrl}/api/booking`); 
  return response.data;
};

export const createBooking = async (bookingData) => {
  const response = await axios.post(`${backendBaseUrl}/api/booking`, bookingData);
  return response.data;
};

export const updateBooking = async (id, updatedData) => {
  const response = await axios.put(`${backendBaseUrl}/api/booking/${id}`, updatedData); 
  return response.data;
};

export const deleteBooking = async (id) => {
  const response = await axios.delete(`${backendBaseUrl}/api/booking/${id}`); 
  return response.data;
};