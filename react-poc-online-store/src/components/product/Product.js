import { useNavigate } from 'react-router-dom';
import './Product.css'

const Product = ({product}) => {
    
    const {id, title, price, thumbnail} = product;

    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(`/products/${id}`);

    return ( 
        <div className="product" onClick={onNavigateHandler}>
            <img src={thumbnail} alt={`${title}`} />
            <div className="footer">
                <span className='name'>{title}</span>
                <span className='price'>${price}</span>
            </div>
        </div> 
    );
  }

  export default Product;