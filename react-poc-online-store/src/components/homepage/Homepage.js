import { useState } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Products from "../products/Products";
import HomeLayout from "./HomeLayout";
import './Homepage.css';

const Homepage = () => {
    const [searchInput, setSearchInput] = useState('');

    return (
        <div className="homepage-container">
            <Header onSearchInput={setSearchInput} />
            <HomeLayout />
            <Products  searchTerm={searchInput}/>
            <Footer />
        </div> 
    );
  }

  export default Homepage;