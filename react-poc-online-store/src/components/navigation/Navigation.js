import SearchInput from "./SearchInput";
import './Navigation.css';
import { ReactComponent as CheckoutSvg } from '../../assets/shopping-bag.svg'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { Link } from "react-router-dom";
import CartDropdown from "../cart/CartDropdown";

import { useCart } from "../../context";

const Navigation = ({ onSearchInput }) => {
    const { openCart, closeCart, isOpen, cartProducts } = useCart();
    
    const totalCart = Object.values(cartProducts).reduce((acc, item) => acc + item.quantity, 0);

    const toggleIsCartOpen = () => {
        isOpen ? closeCart() : openCart()
    };
    
    const onChangeHandler = (event) => {
        onSearchInput(event.target.value);
    }

    return (
        <>
            <div className="navigation-container">
                <Link to='/'>
                    <div className="logo-container"><CrwnLogo /></div>
                </Link>
                <SearchInput placeholder='Search Products' onChangeHandler={onChangeHandler} />
                <div className="nav-links">
                    <Link to='/products'>
                        PRODUCTS
                    </Link>
                    <Link to='/auth'>
                        SIGN IN
                    </Link>
                    <div className="checkout-icon-container" onClick= {toggleIsCartOpen}>
                        <CheckoutSvg className="checkout-icon" />
                        <span>{totalCart}</span>
                    </div>
                    {isOpen && <CartDropdown />}
                </div>
            </div>
            {/* <Outlet /> */}
        </>
    );
}

export default Navigation;