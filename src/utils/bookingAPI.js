import api from './axiosConfig';
import { jwtDecode } from 'jwt-decode';

export const getAllBookings = async () => {
  try {
    const response = await api.get('/booking');
    return response.data;
  } catch (error) {
    console.error("Error fetching all bookings:", error.response?.data || error.message);
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      throw new Error("User not authenticated. Please log in to make a booking.");
    }

    const decoded = jwtDecode(user.token);
    const userId = decoded.user?.id;
    const userEmailFromToken = decoded.user?.email || "";
    const userPhoneFromToken = decoded.user?.phone || "";

    if (!userId) {
      throw new Error("User ID not found in token.");
    }

    const payload = {
      userId,
      serviceName: bookingData.layanan,
      bookingDate: bookingData.tanggal,
      bookingTime: bookingData.jam,
      userName: bookingData.nama,
      userEmail: bookingData.userEmail || userEmailFromToken,
      userPhone: bookingData.userPhone || userPhoneFromToken,
      notes: bookingData.catatan,
    };

    const response = await api.post('/booking', payload, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error.response?.data || error.message);
    throw error;
  }
};

export const updateBooking = async (id, updatedData) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      throw new Error("User not authenticated.");
    }

    const response = await api.put(`/booking?id=${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error updating booking with ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

export const deleteBooking = async (id) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      throw new Error("User not authenticated.");
    }

    const response = await api.delete(`/booking?id=${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error deleting booking with ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};
