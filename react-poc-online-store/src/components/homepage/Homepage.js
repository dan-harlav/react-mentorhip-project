import Categories from "../categories/Categories";
import HomeLayout from "./HomeLayout";
import './Homepage.css';
import { Outlet } from "react-router-dom";

const Homepage = ({products}) => {

    return (
        <>
            <Outlet />
            <div className="homepage-container">
                <HomeLayout />
                <Categories products={products} />
            </div>
        </>
    );
  }

  export default Homepage;