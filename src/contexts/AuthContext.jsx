import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/axiosConfig';
import { jwtDecode } from 'jwt-decode'; // Instal: npm install jwt-decode

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    if (decoded.exp * 1000 > Date.now()) {
                        setIsLoggedIn(true);
                        setCurrentUser({
                            id: decoded.user.id,
                            username: decoded.user.username,
                            email: decoded.user.email,
                            role: decoded.user.role
                        });
                        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    } else {
                        localStorage.removeItem('token');
                        setIsLoggedIn(false);
                        setCurrentUser(null);
                        delete apiClient.defaults.headers.common['Authorization'];
                    }
                } catch (error) {
                    console.error("Token decode/validation error:", error);
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                    setCurrentUser(null);
                    delete apiClient.defaults.headers.common['Authorization'];
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await apiClient.post('/api/login', { email, password });
            const { token } = response.data;

            localStorage.setItem('token', token);
            const decoded = jwtDecode(token);
            setIsLoggedIn(true);
            setCurrentUser({
                id: decoded.user.id,
                username: decoded.user.username,
                email: decoded.user.email,
                role: decoded.user.role
            });
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return { success: true };
        } catch (error) {
            console.error('Login failed:', error.response?.data?.error || error.message);
            setIsLoggedIn(false);
            setCurrentUser(null);
            delete apiClient.defaults.headers.common['Authorization'];
            return { success: false, error: error.response?.data?.error || 'Login failed.' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setCurrentUser(null);
        delete apiClient.defaults.headers.common['Authorization'];
        navigate('/login');
    };

    const authValue = {
        isLoggedIn,
        currentUser,
        loading,
        login,
        logout,
    };

    if (loading) {
        return <div>Loading authentication...</div>;
    }

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};