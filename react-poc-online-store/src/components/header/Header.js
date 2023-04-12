import SearchInput from "./SearchInput";
import './Header.css';

const Header = ({onSearchInput}) => {

    const onChangeHandler = (event) =>{
        onSearchInput(event.target.value);
    }

    return ( 
        <div className="header-container">
            <SearchInput placeholder='Search Products' onChangeHandler={onChangeHandler} />
        </div> 
    );
  }

  export default Header;