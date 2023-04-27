import { Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/homepage/Homepage';
import { useEffect, useState } from 'react';
import BasicLayout from './components/BasicLayout';
import Shop from './components/products/Shop';
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
              <Route path='products/*' element={<Shop products={products} searchTerm={searchInput}/>} />
              <Route path='auth' element={<div />} />
              <Route path='checkout' element={<div />} />
            </Route>
          </Routes>
        </div>
    );
  }

  export default App;