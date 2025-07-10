import axios from 'axios';

// Buat instance Axios
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL, 
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor untuk menambahkan token ke setiap request yang dikirim
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Ambil token dari localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Tambahkan header Authorization
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor untuk menangani respons error (opsional, bisa lebih kompleks nanti)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Contoh: jika token kadaluarsa (status 401 Unauthorized), nanti di redirect ke login
        if (error.response && error.response.status === 401) {
            console.warn("API request unauthorized, token might be expired or invalid.");
    
        }
        return Promise.reject(error);
    }
);

export default apiClient;