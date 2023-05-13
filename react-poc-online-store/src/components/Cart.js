import { useContext } from "react";
import { AppContext } from "../App";

const Cart = () => {

const { contextValue: { cart } } = useContext(AppContext);

  return <ul>
    {
      Object.keys(cart).map((pid, i) => <li key={i}>{pid}:{cart[pid]}</li>)
    }
  </ul>
}

export default Cart;