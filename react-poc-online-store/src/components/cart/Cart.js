import { useContext } from "react";
import { AppContext } from "../../App";

const Cart = () => {

const { contextValue: { cartItems } } = useContext(AppContext);

const cartTotal = Object.values(cartItems).reduce((acc, item) => acc + item.quantity * item.price, 0);

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
      </div>
        {
          cartItems.map((cartItem) => (
            <div className='checkout-item-container'>
              <div className='image-container'>
                <img src={cartItem.thumbnail} alt ={`${cartItem.name}`} />
              </div>
              <span className='name'>{cartItem.title}</span>
              <span className='quantity'></span>
              <span className='value'>{cartItem.quantity}</span>
              <span className='price'>{cartItem.price}</span>
            </div>
              ))
        }
        <span className='total'>Total: ${cartTotal} </span>
    </div>
  )
}

export default Cart;