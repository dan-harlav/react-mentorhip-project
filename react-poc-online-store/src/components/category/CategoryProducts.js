import { useParams } from 'react-router-dom';
import Product from "../product/Product";
import './CategoryProducts.css'

const CategoryProducts = ({products}) => {
    const { category } = useParams();
    
    const filteredProducts = products.filter((product) => product.category === category)
  
  
    return (
      <div className='category-container'>
        <h2 className='category-title'>{category.toUpperCase()}</h2>
        <div className='category-items'>
          {filteredProducts &&
            filteredProducts.map((product) => (<Product key={product.id} product={product} />))
          }
        </div>
      </div>
    )
  }
  
  export default CategoryProducts;
