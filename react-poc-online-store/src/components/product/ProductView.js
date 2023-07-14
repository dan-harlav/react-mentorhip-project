import { useParams } from 'react-router-dom';
import { useCart } from '../../context'

import Button from '@mui/material/Button';

import './ProductView.css';

const ProductDetails = ({ products }) => {
    const { productId } = useParams();
    const { addProduct } = useCart();

    const productDetails = products.find((product) => product.id.toString() === productId.toString())
    
    return (
        <> {productDetails && (
            <div className="product-view-container">
                <img src={productDetails.images[0]} alt={`${productDetails.title}`} />
                <div className="product-details">
                    <span className='name'>{productDetails.title}</span>
                    <span className='description'>{productDetails.description}</span>
                    <span className='price'>${productDetails.price}</span>
                    <Button color="inherit" variant="outlined" className='add-cart-button' onClick={() => addProduct(productDetails)}>Add  to cart</Button>
                </div>
            </div>
        )}
        </>
    );
}

export default ProductDetails;