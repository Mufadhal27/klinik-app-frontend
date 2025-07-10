import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'; 
import { useNavigate, Link } from 'react-router-dom'; 

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth(); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 
        setLoading(true);

        const result = await login(email, password); 

        if (result.success) {
            navigate('/'); 
        } else {
            setError(result.error || 'Terjadi kesalahan saat login.');
        }
        setLoading(false); 
    };

    return (
        <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105">
            <h2 className="text-3xl font-extrabold text-center mb-8 text-emerald-800">Selamat Datang Kembali</h2>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Oops!</strong>
                    <span className="block sm:inline ml-2">{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
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
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        <span>{loading ? 'Logging In...' : 'Login'}</span>
                    </button>
                </div>
            </form>

            <p className="text-center text-gray-600 text-sm mt-6">
                Belum punya akun?{' '}
                <Link to="/register" className="text-emerald-600 hover:text-emerald-800 font-semibold transition duration-200">
                    Daftar di sini
                </Link>
            </p>
        </div>
    );
}

export default LoginForm;