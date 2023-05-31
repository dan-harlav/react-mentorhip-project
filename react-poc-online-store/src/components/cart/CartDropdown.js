import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

import { useCart } from "../../context";
import "./Cart.css";

const CartDropdown = () => {

  const ref = useRef(null);
  // const { onClickOutside } = props;
  const { cartProducts, closeCart, isOpen } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      event.preventDefault();
      if (ref.current && !ref.current.contains(event.target)) {
        closeCart()
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isOpen, closeCart]);

  return (
    <div ref={ref} className="cart-dropdown-container">
      <div className="cart-items">
        {
          cartProducts.length ? (cartProducts.map((item, i) => (
            <div className='cart-item-container' key={i}>
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
    <Button color="inherit" variant="outlined" onClick={() => {
      closeCart();
      navigate('/checkout');
    }} >CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown;