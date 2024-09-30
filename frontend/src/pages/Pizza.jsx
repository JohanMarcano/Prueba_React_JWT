import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardPizza from '../components/CardPizza';
import '../components/Pizza.css';

const Pizza = () => {
  const { id } = useParams(); // Obtener el id de la URL
  const [pizza, setPizza] = useState(null);

  const getPizza = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/pizzas/${id}`);
      const result = await response.json();
      setPizza(result);
    } catch (error) {
      console.error('Error fetching pizza:', error);
    }
  };

  useEffect(() => {
    getPizza();
  }, [id]); // Ejecutar cuando cambie el id

  return (
    <div className='contenedorHH'>
      {pizza ? (
        <CardPizza pizza={pizza} />
      ) : (
        <p>Cargando pizza...</p>
      )}
    </div>
  );
};

export default Pizza;
