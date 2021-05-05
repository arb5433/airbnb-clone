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
    <nav>
      <div>
        <NavLink to="/" exact={true} activeClassName="active">
          Home
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
