import { Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/homepage/Homepage';
import { useEffect, useState } from 'react';
import BasicLayout from './components/BasicLayout';
// import Shop from './components/products/Shop';
import Products from './components/products/Products';
import CategoryProducts from './components/category/CategoryProducts';
import ProductDetails from './components/product/ProductView';
const URL = process.env.REACT_APP_API_URL;


  const App = () => {

    const [searchInput, setSearchInput] = useState('');
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
      const results = await fetch(`${URL}products`);

      const rawData = await results.json();

      setProducts(rawData);
    }

    useEffect(() => {
      fetchProducts();
    }, []);

    return (
        <div className="app-container">
          <Routes>
            <Route path='/' element={<BasicLayout onSearchInput={setSearchInput}   />}>
              <Route index element={<Homepage products={products}/>} />
              <Route path='products/*'>
                <Route index element={<Products products={products} searchTerm={searchInput}/>} />
                <Route path=":category">
                    <Route index element={<CategoryProducts products={products}/>} />
                    <Route path=":productId" element={<ProductDetails products={products}/>} />
                </Route>
              </Route>
              <Route path='auth' element={<div />} />
              <Route path='checkout' element={<div />} />
            </Route>
          </Routes>
        </div>
    );
  }

  export default App;