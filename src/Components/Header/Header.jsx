import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch to dispatch actions
import { logout } from '../../Redux/authSlice'; // Import the logout action from authSlice
import Logo from "../../Assets/logo.png";
import "./Header.css";

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth); // Get isAuthenticated from Redux store
  const dispatch = useDispatch(); // Initialize useDispatch
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate('/'); // Redirect to the login page after logout
  };

  return (
    <>
      {isAuthenticated ? (
        <div className='header user-header'>
          <div className='logoimg'>
            <NavLink to="/">
              <img src={Logo} alt="Logo" />
            </NavLink>
          </div>

          <div className='anchorLinksWrapper'>
            <NavLink to="/YourFights" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Your Fights</NavLink>
            <NavLink to="/leaderboard" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Leaderboard</NavLink>
            <NavLink to="/upcomingfights" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Upcoming Fights</NavLink>
            <NavLink to="/profile" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Profile</NavLink>
          </div>

          <div className='sideLinkswrap'>
            <NavLink to="/UserDashboard" className={({ isActive }) => (isActive ? 'sideLinks activeLink' : 'sideLinks')}>
              Dashboard
            </NavLink>

            <button onClick={handleLogout} className='sideLinks logoutButton' style={{background:'transparent' , border:'none' , outline:'none'}}>
              <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
            </button>
          </div>
        </div>
      ) : (
        <div className='header public-header'>
          <div className='logoimg'>
            <NavLink to="/">
              <img src={Logo} alt="Logo" />
            </NavLink>
          </div>

          <div className='anchorLinksWrapper'>
            <NavLink to="/playforfree" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Play for free</NavLink>
            <NavLink to="/HowToPlay" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>How to play</NavLink>
            <NavLink to="/upcomingfights" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Upcoming Fights</NavLink>
            <NavLink to="/CreateAccount" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Create account</NavLink>
          </div>

          <div className='sideLinkswrap'>
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'sideLinks activeLink' : 'sideLinks')}>
              <i className="fa fa-sign-in" aria-hidden="true"></i> Login
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
