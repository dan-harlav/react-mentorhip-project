import { Route, Routes } from 'react-router-dom';
import ProductDetails from '../product/ProductView';
import Products from './Products';

const Shop = ({products, searchTerm}) => {

    return ( 
        <Routes>
            <Route index element={<Products products={products} searchTerm={searchTerm}/>} />
            <Route path=":productId" element={<ProductDetails products={products}/>} />
        </Routes>
    );
  }

  export default Shop;


