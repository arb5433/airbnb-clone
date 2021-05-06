import React from 'react';
import { NavLink } from 'react-router-dom';
import {useSelector} from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from "./LoginFormModal";
import SignupFormModal from "./SignupFormModal";

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
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
        SEARCH BAR PLACEHOLDER
      </div>
      <div>
        {sessionLinks}
      </div>
    </nav>
  );
}

export default NavBar;
