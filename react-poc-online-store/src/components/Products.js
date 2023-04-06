import { useEffect, useState } from 'react';
import spinner from '../spinner.gif';
import Product from './Product';

const productsData = [
    {
      id: 1,
      name: 'name-1'
    },
    {
      id: 2,
      name: 'name-2'
    },
    {
      id: 3,
      name: 'name-3'
    },
    {
      id: 4,
      name: 'name-4'
    },
    {
      id: 5,
      name: 'name-5'
    },
  ];

const SearchInput = ({placeholder, onChangeHandler}) => {

return (
    <input className='search-input' placeholder={placeholder} onChange={onChangeHandler} />
);
}

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
      const timeout = setTimeout(function () {
          setProducts(productsData);
      }, 1000)
      
      return function ()  {
          clearTimeout(timeout)
      }
    }, []);

    useEffect(() => {
      setFilteredProducts(products)

    }, [products]);
    
    const onChangeHandler = (event) =>{
        const searchTerm = event.target.value;
        setFilteredProducts(products.filter((product) => product.name.includes(searchTerm)))
    }

    if (products.length === 0) return <img src={spinner} alt="xxx"/>

    return (
        <div>
            <SearchInput placeholder='Search Products' onChangeHandler={onChangeHandler} />
            <div className="products-list">
                {filteredProducts && filteredProducts.map((product) => {
                    return <Product key={product.id} product={product} />
                })}
            </div>
        </div>
    );
  }

  export default Products;