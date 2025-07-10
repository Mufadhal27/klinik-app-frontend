import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../utils/axiosConfig'; // Import Axios instance kita

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Untuk konfirmasi password
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); // Untuk pesan sukses
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (password !== confirmPassword) {
            setError('Password dan Konfirmasi Password tidak cocok.');
            setLoading(false);
            return;
        }

        try {
            const response = await apiClient.post('/api/register', { username, email, password });
            setSuccess(response.data.message || 'Registrasi berhasil! Anda akan dialihkan ke halaman login.');
            
            // Kosongkan form setelah berhasil
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            
            // Redirect ke halaman login setelah registrasi berhasil
            setTimeout(() => { 
                navigate('/login');
            }, 2000); // Redirect setelah 2 detik untuk memberi waktu pesan sukses terbaca
        } catch (err) {
            console.error('Registration failed:', err.response?.data?.error || err.message);
            setError(err.response?.data?.error || 'Terjadi kesalahan saat registrasi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105">
            <h2 className="text-3xl font-extrabold text-center mb-8 text-emerald-800">Daftar Akun Baru</h2>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Oops!</strong>
                    <span className="block sm:inline ml-2">{error}</span>
                </div>
            )}
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Berhasil!</strong>
                    <span className="block sm:inline ml-2">{success}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
                        id="username"
                        type="text"
                        placeholder="Pilih username Anda"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
                        id="email"
                        type="email"
                        placeholder="nama@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
                        id="password"
                        type="password"
                        placeholder="Buat password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="confirm-password">
                        Konfirmasi Password
                    </label>
                    <input
                        className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
                        id="confirm-password"
                        type="password"
                        placeholder="Konfirmasi password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <button
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out w-full flex items-center justify-center space-x-2"
                        type="submit"
                        disabled={loading}
                    >
                        {loading && (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        <span>{loading ? 'Mendaftar...' : 'Register'}</span>
                    </button>
                </div>
            </form>

            <p className="text-center text-gray-600 text-sm mt-6">
                Sudah punya akun?{' '}
                <Link to="/login" className="text-emerald-600 hover:text-emerald-800 font-semibold transition duration-200">
                    Login di sini
                </Link>
            </p>
        </div>
    );
}

export default RegisterForm;