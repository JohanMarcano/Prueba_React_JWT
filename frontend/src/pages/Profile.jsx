import { useContext, useEffect } from 'react';
import UserContext from '../components/UserContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { email, getProfile } = useContext(UserContext);

  useEffect(() => {
    getProfile(); // Obtener el perfil del usuario autenticado al cargar la página
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">Profile</h1>
        <p className="lead">{email}</p>
        <Link to="/" className="btn btn-primary">Go Home</Link>
      </div>
    </div>
  );
};

export default Profile;