import { useCart } from '../../context'
const Cart = () => {

  const { cartProducts } = useCart();

const cartTotal = Object.values(cartProducts).reduce((acc, item) => acc + item.quantity * item.price, 0);

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
          cartProducts.map((cartItem, i) => (
            <div className='checkout-item-container' key={i}>
              <div className='image-container'>
                <img src={cartItem.thumbnail} alt ={`${cartItem.name}`} />
              </div>
              <span className='name'>{cartItem.title}</span>
              <span className='quantity'>{cartItem.quantity}</span>
              <span className='price'>{cartItem.price}</span>
            </div>
              ))
        }
        <span className='total'>Total: ${cartTotal} </span>
    </div>
  )
}

export default Cart;