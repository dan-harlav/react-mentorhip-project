import { useEffect, useState } from 'react';
import spinner from '../../assets/spinner.gif';
import Product from '../../components/product/Product';
import './Products.css';

const Products = ({searchTerm}) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
      fetch('https://dummyjson.com/products')
          .then((response) => response.json())
          .then((data) => {
            setProducts(data.products);
            setFilteredProducts(data.products)
          })
          .catch(() => {
            alert('Cannot fetch products')
          });
    }, []);

    useEffect(() => {
      setFilteredProducts(products.filter((product) => product.title.includes(searchTerm)))
    }, [products, searchTerm]);

    if (products.length === 0) return <img src={spinner} alt="spinner"/>

    return (
        <div className='products-container'>
            <h2 className="website-title">All products</h2>
            <div className="products-list">
                {filteredProducts && filteredProducts.map((product) => {
                    return <Product key={product.id} product={product} />
                })}
            </div>
        </div>
    );
  }

  export default Products;