import { useCartContext } from './CartContextProvider';

const useCart = () => {
  const { isOpen, setIsOpen, cartProducts, setCartProducts } = useCartContext();

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addProduct = (newProduct) => {
        const existingCartItem = cartProducts.find((cartItem) => Number(cartItem.id) === Number(newProduct.id));

        const newCartItems = (existingCartItem) ? cartProducts.map((cartItem) => Number(cartItem.id) === Number(newProduct.id) ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem) :
        [...cartProducts, {
            id: newProduct.id,
            title: newProduct.title,
            price: newProduct.price,
            thumbnail: newProduct.thumbnail,
            quantity: 1
        }];

        setCartProducts(newCartItems);
        localStorage.setItem("cart", JSON.stringify(newCartItems));
    }

  return {
    isOpen,
    openCart,
    closeCart,
    cartProducts,
    addProduct
  };
};

export default useCart;