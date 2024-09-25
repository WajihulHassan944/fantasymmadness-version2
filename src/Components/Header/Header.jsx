import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/authSlice';
import {logoutAffiliate} from "../../Redux/affiliateAuthSlice";
import Logo from "../../Assets/logo.png";
import "./Header.css";
import { toast } from 'react-toastify';

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isAuthenticatedAffiliate } = useSelector((state) => state.affiliateAuth);
 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const handleLogout = () => {
    // Dispatch logout action
    dispatch(logout());
    
    // Show a success toast notification
    toast.success("Successfully logged out 👋");
  
    // Navigate to the home page
    navigate('/');
  };
    const handleLogoutAffiliate = () => {
    dispatch(logoutAffiliate());
    toast.success("Successfully logged out 👋");
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>

      {isAuthenticatedAffiliate ? (
        <div className='header user-header'>
          <div className='logoimg'>
            <NavLink to="/">
              <img src={Logo} alt="Logo" />
            </NavLink>
          </div>

          <div className='anchorLinksWrapper'>
            <NavLink to="/AffiliateDashboard" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Your Fights</NavLink>
            <NavLink to="/HowItWorks" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>How it works</NavLink>
            <NavLink to="/AffiliateProfile" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Profile</NavLink>
            <NavLink to="/AffiliatePromotion" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Promotions</NavLink>
            </div>

          <div className='sideLinkswrap'>
          
            <button onClick={handleLogoutAffiliate} className='sideLinks logoutButton' style={{ background: 'transparent', border: 'none', outline: 'none' }}>
              <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
            </button>
          </div>

          <div className='menuIconFont' onClick={toggleMenu}><i className="fa fa-bars"></i></div>
        </div>
      ) : isAuthenticated ? (
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

            <button onClick={handleLogout} className='sideLinks logoutButton' style={{ background: 'transparent', border: 'none', outline: 'none' }}>
              <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
            </button>
          </div>

          <div className='menuIconFont' onClick={toggleMenu}><i className="fa fa-bars"></i></div>
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

          <div className='menuIconFont' onClick={toggleMenu}><i className="fa fa-bars"></i></div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <div className={`mobileMenu ${menuOpen ? 'active' : ''}`}>
        <div className='closeMenuIcon' onClick={toggleMenu}>
          <i className="fa fa-times"></i>
        </div>

        <div className='logoimg'>
          <NavLink to="/" onClick={closeMenu}>
            <img src={Logo} alt="Logo" />
          </NavLink>
        </div>

        <div className='anchorLinksWrapper'>
          {isAuthenticatedAffiliate ? (
            <>
              <NavLink to="/AffiliateDashboard" className='anchorlinks' onClick={closeMenu}>Your Fights</NavLink>
              <NavLink to="/HowItWorks" className='anchorlinks' onClick={closeMenu}>How it works</NavLink>
              <NavLink to="/AffiliateProfile" className='anchorlinks' onClick={closeMenu}>Profile</NavLink>
              <NavLink to="/AffiliatePromotion" className='anchorlinks' onClick={closeMenu}>Promotions</NavLink>
              <button onClick={() => { handleLogoutAffiliate(); closeMenu(); }} className='anchorlinks logoutButton' style={{ background: 'transparent', border: 'none', outline: 'none' }}>
                <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
              </button>
            </>
          ) : isAuthenticated ? (
            <>
              <NavLink to="/YourFights" className='anchorlinks' onClick={closeMenu}>Your Fights</NavLink>
              <NavLink to="/leaderboard" className='anchorlinks' onClick={closeMenu}>Leaderboard</NavLink>
              <NavLink to="/upcomingfights" className='anchorlinks' onClick={closeMenu}>Upcoming Fights</NavLink>
              <NavLink to="/profile" className='anchorlinks' onClick={closeMenu}>Profile</NavLink>
              <NavLink to="/UserDashboard" className='anchorlinks' onClick={closeMenu}>Dashboard</NavLink>
              <button onClick={() => { handleLogout(); closeMenu(); }} className='anchorlinks logoutButton' style={{ background: 'transparent', border: 'none', outline: 'none' }}>
                <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/playforfree" className='anchorlinks' onClick={closeMenu}>Play for free</NavLink>
              <NavLink to="/HowToPlay" className='anchorlinks' onClick={closeMenu}>How to play</NavLink>
              <NavLink to="/upcomingfights" className='anchorlinks' onClick={closeMenu}>Upcoming Fights</NavLink>
              <NavLink to="/CreateAccount" className='anchorlinks' onClick={closeMenu}>Create account</NavLink>
              <NavLink to="/login" className='anchorlinks' onClick={closeMenu}>
                <i className="fa fa-sign-in" aria-hidden="true"></i> Login
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
