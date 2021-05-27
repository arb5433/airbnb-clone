import React from 'react';
import { NavLink } from 'react-router-dom';
import {useSelector} from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from "./LoginFormModal";
import SignupFormModal from "./SignupFormModal";
import SearchBar from './SearchBar';
import MyBookingModal from './MyBookingsModel';
import MyPostingsModal from './MyPostingsModal';

const NavBar = ({isLoaded, loadError}) => {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <MyPostingsModal/>
        <MyBookingModal/>
        <LogoutButton />
      </>
    )
  } else {
    sessionLinks = (
      <>
        <LoginFormModal/>
        <SignupFormModal/>
      </>
    )
  }

  return (
    <nav className='navbar'>
      <div className='logo-wrapper'>
        <NavLink className='logo-wrapper' to="/" exact={true} activeClassName="active">
          <div className='logo'/>
          <div className='site-name'/>
        </NavLink>
      </div>
      <div>
        <SearchBar isLoaded={isLoaded}/>
      </div>
      <div>
        {sessionLinks}
      </div>
    </nav>
  );
}

export default NavBar;
