import { useCartContext } from './CartContextProvider';

const useCart = () => {
  const { isOpen, setIsOpen, cartProducts, setCartProducts, cartTotal, cartCount } = useCartContext();

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addProduct = (newProduct) => {
        const existingCartProduct = cartProducts.find((cartProduct) => Number(cartProduct.id) === Number(newProduct.id));

        const newCartProducts = (existingCartProduct) ? cartProducts.map((cartProduct) => Number(cartProduct.id) === Number(newProduct.id) ? {...cartProduct, quantity: cartProduct.quantity + 1} : cartProduct) :
        [...cartProducts, {
            id: newProduct.id,
            title: newProduct.title,
            price: newProduct.price,
            thumbnail: newProduct.thumbnail,
            quantity: 1
        }];

        setCartProducts(newCartProducts);
        localStorage.setItem("cart", JSON.stringify(newCartProducts));
    }

    const removeProduct = (productToRemove) => {
      let newCartProducts = cartProducts;
      const existingCartProduct = cartProducts.find((cartProduct) => Number(cartProduct.id) === Number(productToRemove.id));

      if (existingCartProduct.quantity === 1) {
        newCartProducts = cartProducts.filter((cartProduct) => Number(cartProduct.id) !== Number(productToRemove.id));
      } else {
        newCartProducts = cartProducts.map((cartProduct) => Number(cartProduct.id) === Number(productToRemove.id) ? {...cartProduct, quantity: cartProduct.quantity - 1} : cartProduct);
      }

      setCartProducts(newCartProducts);
      localStorage.setItem("cart", JSON.stringify(newCartProducts));
  }

  const clearProduct = (productToClear) => {
    const newCartProducts = cartProducts.filter((cartProduct) => Number(cartProduct.id) !== Number(productToClear.id));

    setCartProducts(newCartProducts);
    localStorage.setItem("cart", JSON.stringify(newCartProducts));
  }

  return {
    isOpen,
    openCart,
    closeCart,
    cartProducts,
    addProduct,
    removeProduct,
    clearProduct,
    cartTotal,
    cartCount
  };
};

export default useCart;