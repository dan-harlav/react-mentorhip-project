import { useContext } from "react";

import SearchInput from "./SearchInput";
import './Navigation.css';
import { ReactComponent as CheckoutSvg } from '../../assets/shopping-bag.svg'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { Link } from "react-router-dom";
import CartDropdown from "../cart/CartDropdown";

import { useCart } from "../../context";
import { UserContext } from "../../context/UserContextProvider";
import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

const API = axios.create({
    baseURL: `${URL}`,
    withCredentials: true,
  });

const Navigation = ({ onSearchInput }) => {
    const { openCart, closeCart, isOpen, cartCount } = useCart();
    

    const { currentUser, setCurrentUser} = useContext(UserContext);

    const toggleIsCartOpen = () => {
        isOpen ? closeCart() : openCart()
    };
    
    const onChangeHandler = (event) => {
        onSearchInput(event.target.value);
    }

    const signOutUser = async () => {
        try {
            await API.post("/sign-out")
            .then((res) => {
                setCurrentUser(null);
            });
        } catch (err) {
          alert(`Error occured: ${err.message}`);
        }

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
                    {
                        currentUser ? (
                        <Link onClick={signOutUser} >
                            SIGN OUT</Link>
                        ) :
                        (<Link to='/auth'>
                            SIGN IN
                        </Link>)
                    }
                    <div className="checkout-icon-container" onClick= {toggleIsCartOpen}>
                        <CheckoutSvg className="checkout-icon" />
                        <span>{cartCount}</span>
                    </div>
                    {isOpen && <CartDropdown />}
                </div>
            </div>
            {/* <Outlet /> */}
        </>
    );
}

export default Navigation;