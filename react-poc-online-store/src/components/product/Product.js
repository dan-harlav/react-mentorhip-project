import './Product.css'

const Product = ({product}) => {
    
    const {title, price, thumbnail} = product;

    return ( 
        <div className="product">
            <img src={thumbnail} alt={`${title}`} />
            <div className="footer">
                <span className='name'>{title}</span>
                <span className='price'>${price}</span>
            </div>
        </div> 
    );
  }

  export default Product;