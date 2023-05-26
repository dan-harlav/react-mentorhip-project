import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { AppContext } from "../../App";
import "./Cart.css";

const CartDropdown = () => {

const { contextValue: { cartItems } } = useContext(AppContext);
console.log(`cartItems: ${JSON.stringify(cartItems)}`);
const navigate = useNavigate();

return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {
          cartItems.length ? (cartItems.map(item => (
            <div className='cart-item-container'>
                <img src={item.thumbnail} alt={`${item.name}`} />
                <div className='item-details'>
                    <span className='name'>{item.title}</span>
                    <span className='price'>{item.quantity} x ${item.price}</span>
                </div>
            </div>
            ))
          ): (<div className="cart-is-empty">Your card is empty</div>)
        }
      </div>
      <button onClick={() => navigate('/checkout')} >CHECKOUT</button>
    </div>
  )
}

export default CartDropdown;