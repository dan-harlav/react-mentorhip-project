import { useNavigate } from 'react-router-dom';
import './Categories.css';

const Categories = ({products}) => {

    // const categoryProducts = [];
    // products.map((product) => {
    //     if (!categoryProducts[product.category]) {
    //         categoryProducts[product.category] = [];
    //     }
    //     categoryProducts[product.category].push(product)
    // });
    const navigate = useNavigate();


    const categories = [];
    products.map((product) => {
        if (!categories.includes(product.category)) {
            categories.push(product.category);
        }

        return product;
    });


    return (
        <div className='categories-preview-container'>
          {categories.map((category) => (
            <div className="category-preview-item" onClick={() => {navigate(`products/${category}`)}}>
                <div>
                    <h2>{category.toUpperCase()}</h2>
                    <p>Shop Now</p>
                </div>
            </div>
          ))}
        </div>
      );
}


export default Categories