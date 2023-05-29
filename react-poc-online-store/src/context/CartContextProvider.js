import { createContext, useContext, useState } from 'react';

const CartContext = createContext(undefined);
const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }

  return context;
};

const CartProvider = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
  const [cartProducts, setCartProducts] = useState(cartStorage);

  const CartContextValue = {
    isOpen,
    setIsOpen,
    cartProducts,
    setCartProducts,
  };

  return <CartContext.Provider value={CartContextValue} {...props} />;
};

export { CartProvider, useCartContext };