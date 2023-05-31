import { useCart } from '../../context'

import {ArrowBackIos, ArrowForwardIos }  from '@mui/icons-material';

const Cart = () => {

  const { cartProducts, cartTotal, addProduct, removeProduct, clearProduct } = useCart();

  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
            <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
        {
          cartProducts.map((cartItem, i) => (
            <div className='checkout-item-container' key={i}>
              <div className='image-container'>
                <img src={cartItem.thumbnail} alt ={`${cartItem.name}`} />
              </div>
              <span className='name'>{cartItem.title}</span>
              <span className='quantity'>
                <ArrowBackIos className='arrow' onClick={() => removeProduct(cartItem)} />
                <span className='value'>{cartItem.quantity}</span>
                <ArrowForwardIos className='arrow' onClick={() => addProduct(cartItem)} />
              </span>
              <span className='price'>{cartItem.price}</span>
              <div onClick={() => clearProduct(cartItem)} className='remove-button'>&#10005;</div>
            </div>
              ))
        }
        <span className='total'>Total: ${cartTotal} </span>
    </div>
  )
}

export default Cart;