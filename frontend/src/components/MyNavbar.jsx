import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { CartContext } from './CartContext';
import UserContext from './UserContext';
import { Link } from 'react-router-dom';

function MyNavbar() {
  const { calculateTotal } = useContext(CartContext);
  const { token, logout } = useContext(UserContext);

  return (
    <Navbar bg="dark" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/" className='text-white'>Pizzería Mamma Mía!</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/"><Button variant="outline-light">🍕Home</Button></Nav.Link>

          {token ? (
            <>
              <Nav.Link as={Link} to="/profile"><Button variant="outline-light">🔓Profile</Button></Nav.Link>
              <Button variant="outline-danger" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login"><Button variant="outline-light">🔐Login</Button></Nav.Link>
              <Nav.Link as={Link} to="/register"><Button variant="outline-light">🔐Register</Button></Nav.Link>
            </>
          )}

          <Nav.Link as={Link} to="/cart">
            <Button variant="outline-primary">🛒Total: ${calculateTotal().toLocaleString()}</Button>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
