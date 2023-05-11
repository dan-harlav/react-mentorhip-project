import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './Product.css'

const Product = ({product}) => {
    
    const {id, title, price, thumbnail} = product;

    const {category} = useParams();

    const location = useLocation();

    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(`${location.pathname}/${category ?? product.category.toLowerCase()}/${id}`);

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