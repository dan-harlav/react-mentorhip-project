import { useContext } from "react";
import { useParams } from 'react-router-dom';
import { AppContext } from "../../App";
import './ProductView.css';

const ProductDetails = ({ products }) => {
    const { contextValue, setContextValue } = useContext(AppContext);
    const { productId } = useParams();

    const productDetails = products.find((product) => product.id.toString() === productId.toString())
    const addToCart = () => {
        const { cartItems } = contextValue;
        const existingCartItem = cartItems.find((cartItem) => Number(cartItem.id) === Number(productId));

        const newCartItems = (existingCartItem) ? cartItems.map((cartItem) => Number(cartItem.id) === Number(productId) ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem) :
        [...cartItems, {
            id: productDetails.id,
            title: productDetails.title,
            price: productDetails.price,
            thumbnail: productDetails.thumbnail,
            quantity: 1
        }];

        console.log(newCartItems)

        setContextValue({ ...contextValue, cartItems: newCartItems});
    }

    return (
        <> {productDetails && (
            <div className="product-view-container">
                <img src={productDetails.images[0]} alt={`${productDetails.title}`} />
                <div className="product-details">
                    <span className='name'>{productDetails.title}</span>
                    <span className='description'>{productDetails.description}</span>
                    <span className='price'>${productDetails.price}</span>
                    <button type="button" className='add-cart-button' onClick={addToCart}>Add  to cart</button>
                </div>
            </div>
        )}
        </>
    );
}

export default ProductDetails;