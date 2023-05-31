import { createContext, useContext, useState, useEffect } from 'react';

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
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartTotal = cartProducts.reduce((total, cartProduct) => total + cartProduct.quantity * cartProduct.price, 0);
    setCartTotal(newCartTotal);
  }, [cartProducts]);

  useEffect(() => {
    const newCartCount = cartProducts.reduce((total, cartProduct) => total + cartProduct.quantity, 0);
    setCartCount(newCartCount);
  }, [cartProducts]);

  const CartContextValue = {
    isOpen,
    setIsOpen,
    cartProducts,
    setCartProducts,
    cartTotal,
    cartCount
  };

  return <CartContext.Provider value={CartContextValue} {...props} />;
};

export { CartProvider, useCartContext };