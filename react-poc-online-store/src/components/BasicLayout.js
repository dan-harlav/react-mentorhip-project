import { Outlet } from 'react-router-dom'
import Footer from './footer/Footer';
import Navigation from './navigation/Navigation';

const BasicLayout = ({onSearchInput}) =>  {

  return (
    <>
      <Navigation onSearchInput={onSearchInput}/>
      <Outlet />
      <Footer />
    </>
  )
}

export default BasicLayout;