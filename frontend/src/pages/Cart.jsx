import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert'; // Importar componente Alert de Bootstrap
import { CartContext } from '../components/CartContext';
import UserContext from '../components/UserContext'; 

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, calculateTotal } = useContext(CartContext);
  const { token } = useContext(UserContext); 
  const [successMessage, setSuccessMessage] = useState(false); // Estado para el mensaje de éxito

  const handleCheckout = async () => {
    if (!token) return;

    try {
      const response = await fetch('http://localhost:3000/api/checkouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ cart }),
      });

      if (response.ok) {
        setSuccessMessage(true); // Mostrar mensaje de éxito
        setTimeout(() => setSuccessMessage(false), 3000); // Ocultar alerta después de 3 segundos
      } else {
        alert('Error en la compra');
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <Container className="my-4">
      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage(false)} dismissible>
          Compra realizada con éxito.
        </Alert>
      )}
      <Row>
        {cart.length > 0 ? (
          cart.map(pizza => (
            <Col xs={12} sm={6} md={4} key={pizza.id} className="mb-4">
              <div className="card p-3">
                <img src={pizza.img} alt={pizza.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <h2 className="mt-3">{pizza.name}</h2>
                <p>Precio: ${pizza.price.toLocaleString()}</p>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <Button variant="secondary" onClick={() => decreaseQuantity(pizza.id)}>-</Button>
                  <span>Cantidad: {pizza.count}</span>
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
      {cart.length > 0 && (
        <div className="text-center mt-4">
          <h3>Total: ${calculateTotal().toLocaleString()}</h3>
          <Button variant="primary" onClick={handleCheckout} disabled={!token}>Pagar</Button>
        </div>
      )}
    </Container>
  );
};

export default Cart;
