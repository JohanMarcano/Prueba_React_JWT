import React, { useState } from 'react';
import UserContext from './UserContext'; // Importar el contexto

// Crear el proveedor del contexto
export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null); // Cambiado a null por defecto

  const login = (newToken) => {
    setToken(newToken); // Establecer el token al iniciar sesión
  };

  const logout = () => {
    setToken(null); // Establecer el token a null al cerrar sesión
  };

  return (
    <UserContext.Provider value={{ token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
