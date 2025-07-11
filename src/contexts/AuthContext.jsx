import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/axiosConfig';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userObj = JSON.parse(storedUser);
          const decoded = jwtDecode(userObj.token);
          if (decoded.exp * 1000 > Date.now()) {
            setIsLoggedIn(true);
            setCurrentUser({
              id: decoded.user.id,
              username: decoded.user.username,
              email: decoded.user.email,
              role: decoded.user.role
            });
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${userObj.token}`;
          } else {
            localStorage.removeItem('user');
          }
        } catch (err) {
          console.error("Gagal decode token:", err);
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await apiClient.post('/login', { email, password });
      const { token } = response.data;
      const decoded = jwtDecode(token);

      const userObject = {
        token,
        id: decoded.user.id,
        username: decoded.user.username,
        email: decoded.user.email,
        role: decoded.user.role
      };

      localStorage.setItem('user', JSON.stringify(userObject));

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
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      setCurrentUser(null);
      delete apiClient.defaults.headers.common['Authorization'];
      return { success: false, error: error.response?.data?.error || 'Login failed.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setCurrentUser(null);
    delete apiClient.defaults.headers.common['Authorization'];
    navigate('/');
  };

  const authValue = {
    isLoggedIn,
    user: currentUser,
    loading,
    login,
    logout
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
