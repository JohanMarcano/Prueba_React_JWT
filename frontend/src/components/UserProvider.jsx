import React, { useState, useEffect } from 'react';
import UserContext from './UserContext'; // Importar el contexto

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [email, setEmail] = useState(localStorage.getItem('email') || '');

  // Método para login
  const login = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.token) {
        setToken(data.token);
        setEmail(data.email);
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Método para registro
  const register = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.token) {
        setToken(data.token);
        setEmail(data.email);
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  // Método para obtener el perfil del usuario
  const getProfile = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.email) {
        setEmail(data.email);
      } else {
        alert('Failed to get profile');
      }
    } catch (error) {
      console.error('Profile error:', error);
    }
  };

  // Método para logout
  const logout = () => {
    setToken(null);
    setEmail('');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  return (
    <UserContext.Provider value={{ token, email, login, register, getProfile, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;