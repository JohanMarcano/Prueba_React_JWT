import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import UserContext from '../components/UserContext';

const RegisterPage = () => {
  const { register } = useContext(UserContext); // Acceder al método register desde el contexto
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    await register(formData); // Llamar al método register
  };

  return (
    <div className="RegisterPage">
      <h1>Register</h1>
      <Form noValidate onSubmit={handleSubmit}>
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
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Contraseña"
              name="password"
              minLength="6"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationConfirmPassword">
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Confirmar contraseña"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Button type="submit">Registrar</Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
