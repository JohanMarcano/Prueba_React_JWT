import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

function CardPizza({ pizza, addToCart }) {
  return (
    <Card style={{ width: '26rem', margin: '15px' }}>
      <Card.Img variant="top" src={pizza.img} alt={pizza.name} />
      <Card.Body>
        <Card.Title>{pizza.name}</Card.Title>
        <Card.Text>{pizza.desc}</Card.Text>
        <Card.Text>Precio: ${pizza.price}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Ingredientes: <br /> {pizza.ingredients.join(', ')}</ListGroup.Item>
      </ListGroup>
      <Card.Body className="d-flex grid gap-5">
        <Button variant="primary" onClick={() => addToCart(pizza)}>Añadir al Carrito</Button>
        <Link to={`/pizza/${pizza.id}`}>
          <Button variant="secondary">Ver detalle</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default CardPizza;
