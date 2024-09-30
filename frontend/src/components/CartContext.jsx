import React, { createContext, useState } from 'react';

// Crear el contexto
export const CartContext = createContext();

// Crear el proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para añadir un producto al carrito
  const addToCart = (pizza) => {
    setCart(prevCart => {
      const exists = prevCart.find(p => p.id === pizza.id);
      if (exists) {
        return prevCart.map(p => 
          p.id === pizza.id ? { ...p, count: p.count + 1 } : p
        );
      } else {
        return [...prevCart, { ...pizza, count: 1 }];
      }
    });
  };

  // Función para aumentar la cantidad de un producto en el carrito
  const increaseQuantity = (id) => {
    setCart(prevCart =>
      prevCart.map(p => (p.id === id ? { ...p, count: p.count + 1 } : p))
    );
  };

  // Función para disminuir la cantidad de un producto en el carrito
  const decreaseQuantity = (id) => {
    setCart(prevCart =>
      prevCart
        .map(p => (p.id === id ? { ...p, count: p.count - 1 } : p))
        .filter(p => p.count > 0) // Eliminar productos con cantidad 0
    );
  };

  // Función para calcular el total del carrito
  const calculateTotal = () => {
    return cart.reduce((total, pizza) => total + pizza.price * pizza.count, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, calculateTotal }}>
      {children}
    </CartContext.Provider>
  );
};
