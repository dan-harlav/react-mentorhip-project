import { useParams } from 'react-router-dom';
import './ProductView.css';

const ProductDetails = ({products}) => {

    const { productId } = useParams();

    const productDetails = products.find((product) => product.id.toString() === productId.toString())

    return (
        <> {productDetails && (
            <div className="product-view-container">
                <img src={productDetails.images[0]} alt={`${productDetails.title}`} />
                <div className="product-details">
                    <span className='name'>{productDetails.title}</span>
                    <span className='description'>{productDetails.description}</span>
                    <span className='price'>${productDetails.price}</span>
                    <button type="button" className='add-cart-button'>Buy it Now</button>
                </div>
            </div>
        )}
        </>
    );
  }

  export default ProductDetails;