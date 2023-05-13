import { useEffect, useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/homepage/Homepage';
import BasicLayout from './components/BasicLayout';
import Shop from './components/products/Shop';
import Cart from './components/Cart';
import './App.css';

const URL = process.env.REACT_APP_API_URL;
export const AppContext = createContext(undefined);


  const App = () => {
    const [contextValue, setContextValue] = useState({
      cart: {}
      });
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
      <AppContext.Provider value={{
        contextValue,
        setContextValue
      }}>
        <div className="app-container">
          <Routes>
            <Route path='/' element={<BasicLayout onSearchInput={setSearchInput}   />}>
              <Route index element={<Homepage products={products}/>} />
              <Route path='products/*' element={<Shop products={products} searchTerm={searchInput}/>} />
              <Route path='auth' element={<div />} />
              <Route path='checkout' element={<Cart />} />
            </Route>
          </Routes>
        </div>
      </AppContext.Provider>
    );
  }

  export default App;