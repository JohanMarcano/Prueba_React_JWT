import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CartContext } from '../components/CartContext';
import UserContext from '../components/UserContext'; 

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, calculateTotal } = useContext(CartContext);
  const { token } = useContext(UserContext); 

  return (
    <Container className="my-4">
      <Row>
        {cart.length > 0 ? (
          cart.map(pizza => (
            <Col xs={12} sm={6} md={4} key={pizza.id} className="mb-4">
              <div>
                <img src={pizza.img} alt={pizza.name} />
                <h2>{pizza.name}</h2>
                <p>Precio: ${pizza.price}</p>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <Button variant="secondary" onClick={() => decreaseQuantity(pizza.id)}>-</Button>
                  <span>Quantity: {pizza.count}</span>
                  <Button variant="secondary" onClick={() => increaseQuantity(pizza.id)}>+</Button>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <p>El carrito está vacío.</p>
          </Col>
        )}
      </Row>
      <div className="text-center mt-4">
        <h3>Total: ${calculateTotal().toLocaleString()}</h3>
        <Button variant="primary" disabled={!token}>Pagar</Button>
      </div>
    </Container>
  );
};

export default Cart;
