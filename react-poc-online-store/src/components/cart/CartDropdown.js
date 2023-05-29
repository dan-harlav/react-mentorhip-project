import { useNavigate } from 'react-router-dom';
import { useCart } from "../../context";
import "./Cart.css";

const CartDropdown = () => {

  const { cartProducts, closeCart } = useCart();
const navigate = useNavigate();

return (
    <div className="cart-dropdown-container">
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
    <button onClick={() => {
      closeCart();
      navigate('/checkout');
    }} >CHECKOUT</button>
    </div>
  )
}

export default CartDropdown;