import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from './UserContext'; // Importar el UserContext

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(UserContext); // Obtener el token

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
