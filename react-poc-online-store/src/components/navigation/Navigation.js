import { useContext } from "react";
import SearchInput from "./SearchInput";
import './Navigation.css';
import { ReactComponent as CheckoutSvg } from '../../assets/shopping-bag.svg'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { Link } from "react-router-dom";
import { AppContext } from "../../App";

const Navigation = ({ onSearchInput }) => {
    const { contextValue: { cart } } = useContext(AppContext);
    
    const totalCart = Object.values(cart).reduce((a, b) => a + b, 0);
    
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
                    <Link to='/checkout'>
                        <div className="checkout-icon-container" >
                            <CheckoutSvg className="checkout-icon" />
                            <span style={{ padding: '5px' }}>{totalCart}</span>
                        </div>
                    </Link>
                </div>
            </div>
            {/* <Outlet /> */}
        </>
    );
}

export default Navigation;