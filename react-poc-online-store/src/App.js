import { useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/homepage/Homepage';
import BasicLayout from './components/BasicLayout';
import Shop from './components/products/Shop';
import Cart from './components/cart/Cart';
import Authentication from './components/authentication/Authentication';
import './App.css';
import { CartProvider } from './context';
import { UserContext } from './context/UserContextProvider';

const URL = process.env.REACT_APP_API_URL;


  const App = () => {
    const [searchInput, setSearchInput] = useState('');
    const [products, setProducts] = useState([]);
    const {currentUser} = useContext(UserContext)

    const fetchProducts = async () => {
      try {
        const results = await fetch(`${URL}products`, {
          credentials: "include",
        });
        if (results.status === 200) {
          const rawData = await results.json();
  
          setProducts(rawData);
        } else {
          setProducts([]);
        }
      } catch(err) {
        setProducts([]);
        console.log(err.message);
      }
    }

    useEffect(() => {
      fetchProducts();
    }, [currentUser]);

    return (
        <CartProvider>
          <div className="app-container">
            <Routes>
              <Route path='/' element={<BasicLayout onSearchInput={setSearchInput}   />}>
                <Route index element={<Homepage products={products}/>} />
                <Route path='products/*' element={<Shop products={products} searchTerm={searchInput}/>} />
                <Route path='auth' element={<Authentication />} />
                <Route path='checkout' element={<Cart />} />
              </Route>
            </Routes>
          </div>
          </CartProvider>
    );
  }

  export default App;