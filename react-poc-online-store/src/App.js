import { useState } from 'react';
import './App.css';

const products = [
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

  const Products = ({products}) => {

    return (
        <div className="products-list">
            {products && products.map((product) => {
                const {id, name} = product;
                return <div id={id} className="product">
                    {name}
                </div> 
            })}
        </div>
    );
  }


  const App = () => {
    const [filteredProducts, setFilteredProducts] = useState(products)
    const onChangeHandler = (event) =>{
        const searchTerm = event.target.value;
        setFilteredProducts(products.filter((product) => product.name.includes(searchTerm)))
    }
    return (
        <div className="app">
            <h1 className="app-title">My First React App</h1>
            <SearchInput placeholder='Search Products' onChangeHandler={onChangeHandler} />
            <Products products={filteredProducts} />
        </div>
    );
  }

  export default App;