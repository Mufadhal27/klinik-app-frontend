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
        let userId = null;
        let userEmailFromToken = null;
        let userPhoneFromToken = null;

        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            const decodedToken = jwtDecode(user.token);
            userId = decodedToken.id;
            userEmailFromToken = decodedToken.email;
            userPhoneFromToken = decodedToken.phone;
        }

        if (!userId) {
            throw new Error("User not authenticated. Please log in to make a booking.");
        }

        const payload = {
            userId: userId,
            serviceName: bookingData.layanan,
            bookingDate: bookingData.tanggal,
            bookingTime: bookingData.jam,
            userName: bookingData.nama,
            userEmail: bookingData.userEmail || userEmailFromToken,
            userPhone: bookingData.userPhone || userPhoneFromToken,
            notes: bookingData.catatan,
        };

        const response = await api.post('/booking', payload);
        return response.data;
    } catch (error) {
        console.error("Error creating booking:", error.response?.data || error.message);
        throw error;
    }
};

export const updateBooking = async (id, updatedData) => {
    try {
        const response = await api.put(`/booking/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error(`Error updating booking with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

export const deleteBooking = async (id) => {
    try {
        const response = await api.delete(`/booking/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting booking with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};