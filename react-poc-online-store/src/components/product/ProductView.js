import { useContext } from "react";
import { useParams } from 'react-router-dom';
import { AppContext } from "../../App";
import './ProductView.css';

const ProductDetails = ({products}) => {
    const { contextValue, setContextValue } = useContext(AppContext);
    const { productId } = useParams();

    const productDetails = products.find((product) => product.id.toString() === productId.toString())
    const addToCart = () => {
        const { cart } = contextValue;
        const newCart = { ...cart, [productId]: cart[productId] ? cart[productId] + 1 : 1 }
        setContextValue({...contextValue, cart: newCart });
    }

    console.log({contextValue})

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