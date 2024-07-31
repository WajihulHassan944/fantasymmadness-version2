import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from "../../Assets/logo.png";
import "./Header.css";

const Header = () => {
  return (
    <div className='header'>
      <div className='logoimg'>
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>
      </div>

      <div className='anchorLinksWrapper'>
        <NavLink to="/playforfree" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Play for free</NavLink>
        <NavLink to="/HowToPlay" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>How to play</NavLink>
        <NavLink to="/upcomingfights" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Upcoming Fights</NavLink>
        <NavLink to="/createaccount" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Create account</NavLink>
      </div>

      <div className='sideLinkswrap'>
        <NavLink to="/login" className={({ isActive }) => (isActive ? 'sideLinks activeLink' : 'sideLinks')}>
          <i className="fa fa-sign-in" aria-hidden="true"></i> Login
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
