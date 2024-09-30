import React, { useEffect, useState, useContext } from 'react';
import CardPizza from '../components/CardPizza';
import { CartContext } from '../components/CartContext';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const { addToCart } = useContext(CartContext); // Usar el contexto para añadir al carrito

  // Función asíncrona para obtener las pizzas desde la API
  const getPizzas = async () => {
    const response = await fetch("http://localhost:3000/api/pizzas/");
    const result = await response.json();
    setPizzas(result);
  };

  useEffect(() => {
    getPizzas();
  }, []);

  return (
    <div className='contenedorH'>
      {pizzas.map((p, i) => (
        <CardPizza key={i} pizza={p} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default Home;
