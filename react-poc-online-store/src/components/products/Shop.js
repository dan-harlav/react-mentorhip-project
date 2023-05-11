import { Route, Routes } from 'react-router-dom';
import ProductDetails from '../product/ProductView';
import Products from './Products';
import CategoryProducts from '../category/CategoryProducts';

const Shop = ({products, searchTerm}) => {

    return ( 
        <Routes>
            <Route index element={<Products products={products} searchTerm={searchTerm}/>} />
            <Route path=":category">
                <Route index element={<CategoryProducts products={products}/>} />
                <Route path=":productId" element={<ProductDetails products={products}/>} />
            </Route>
        </Routes>
    );
  }

  export default Shop;


