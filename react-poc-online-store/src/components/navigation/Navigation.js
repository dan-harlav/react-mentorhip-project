import SearchInput from "./SearchInput";
import './Navigation.css';
import { ReactComponent as CheckoutSvg } from '../../assets/shopping-bag.svg'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { Link } from "react-router-dom";
import { Fragment } from "react";

const Navigation = ({ onSearchInput }) => {

    const onChangeHandler = (event) => {
        onSearchInput(event.target.value);
    }

    return (
        <Fragment>
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
                        </div>
                    </Link>
                </div>
            </div>
            {/* <Outlet /> */}
        </Fragment>
    );
}

export default Navigation;