import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import UserContext from '../components/UserContext';

const LoginPage = () => {
  const { login } = useContext(UserContext); // Acceder al método login desde el contexto
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(formData); // Llamar al método login
  };

  return (
    <div className='login'>
      <Form noValidate onSubmit={handleSubmit}>
        <h1>Login</h1>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Button type="submit">Iniciar sesión</Button>
      </Form>
    </div>
  );
};

export default LoginPage;
