import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/authSlice';
import {logoutAffiliate} from "../../Redux/affiliateAuthSlice";
import Logo from "../../Assets/logo.png";
import "./Header.css";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import WinImg from "../../Assets/promotional-banner-home-removebg-preview.png";
const Header = () => {
  
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isAuthenticatedAffiliate } = useSelector((state) => state.affiliateAuth);
  const submenuRef = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const authStatusSponsor = localStorage.getItem('isSponsorAuthenticated') === 'true';
  const [isVisible, setIsVisible] = useState(true);
  const [showPromotion, setShowPromotion] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPromotion(true);
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
  }, []);
  
  useEffect(() => {
    if (submenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    
    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [submenuOpen]);

  const isFightsActive =
  location.pathname.startsWith('/upcomingfights') ||
  location.pathname.startsWith('/past-fights') ||
  location.pathname.startsWith('/YourFights') ||
  location.pathname.startsWith('/our-fighters');


  const toggleSubmenu = () => {
    setSubmenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (submenuRef.current && !submenuRef.current.contains(event.target)) {
      setSubmenuOpen(false);
    }
  };
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


  const handleLogoutSponsor = () => {
    // Clear authentication status and sponsor data from localStorage
    localStorage.removeItem('isSponsorAuthenticated');
    localStorage.removeItem('sponsorData');
  
  };
  const shouldRenderScrollingText =
  !isAuthenticated && !isAuthenticatedAffiliate && !location.pathname.includes('/administration') && !authStatusSponsor;
 
  const headerStyles = shouldRenderScrollingText
  ? {  top: '52px' }
  : { top: '0' };
  return (
    <>
 { shouldRenderScrollingText && (
  <Link to="/CreateAccount" style={{ textDecoration: 'none' }}>
      <div className="scrolling-text-container">
        <div className="scrolling-text-inner" style={{ '--marquee-speed': '20s', '--direction': 'scroll-left' }} role="marquee">
          <div className="scrolling-text">
            <div className="scrolling-text-item">
              🤑&nbsp; <span>Signup</span> Get $20 instantly &nbsp;🚀&nbsp; Sign up now, get 20 tokens free &nbsp;🎁&nbsp; Play Now and Win $10,000 &nbsp;🤑
            </div>
            <div className="scrolling-text-item">
            <span>Signup</span> Get $20 instantly&nbsp; 🚀&nbsp; Sign up now, get 20 tokens free&nbsp; 🎁&nbsp; Play Now and Win $10,000&nbsp; 🤑
            </div>
            <div className="scrolling-text-item">
            <span>Signup</span> Get $20 instantly&nbsp; 🚀&nbsp; Sign up now, get 20 tokens free&nbsp; 🎁&nbsp; Play Now and Win $10,000&nbsp; 🤑
            </div>
          </div>
        </div>
      </div>
      </Link>
    )
 }
 {showPromotion && isVisible && shouldRenderScrollingText && (
  <div className="container-promotion-absolute-center">
    <div className="close-button" onClick={handleClose}>✖</div>
  <div className='imgpromotionContainer'> <img src={WinImg} alt="winimg" /></div>
    <NavLink to="/CreateAccount" onClick={handleClose}>
      <button className="signup-button">Sign up Now</button>
    </NavLink>
    <p>
      Don’t miss your shot at the ultimate prize – a massive <strong>$10,000</strong> is up for grabs! Join the action now and claim your chance to win big!
    </p>
  </div>
)}



      {isAuthenticatedAffiliate ? (
        <div className='header user-header' style={headerStyles} >
          <div className='logoimg'>
            <NavLink to="/">
              <img src={Logo} alt="Logo" />
            </NavLink>
          </div>

          <div className='anchorLinksWrapper'>
            <NavLink to="/AffiliateDashboard" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Your Fights</NavLink>
            <NavLink to="/HowItWorks" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>How it works</NavLink>
            <NavLink to="/AffiliateProfile" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Profile</NavLink>
            <NavLink to="/AffiliatePromotion" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Insights</NavLink>
            <NavLink to="/affiliate-guides" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Guides</NavLink>
        
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
          <NavLink 
        className={`anchorlinks fightsubmenu ${isFightsActive ? 'activeLink' : ''}`}
        onClick={toggleSubmenu}
        ref={submenuRef}
      >
        Fights
        <div className={`submenu ${submenuOpen ? 'submenuOpen' : 'submenuClosedclass'}`}  style={{
      pointerEvents: submenuOpen ? 'auto' : 'none' // Disable pointer events when closed
    }}>
          <NavLink to="/upcomingfights" className="submenuLink">Upcoming Fights</NavLink>
          <NavLink to="/past-fights" className="submenuLink">Past Fights</NavLink>
          <NavLink to="/YourFights" className="submenuLink">Your Fights</NavLink>
          <NavLink to="/our-fighters" className="submenuLink">Our Fighters</NavLink>
        </div>
      </NavLink>
 
            <NavLink to="/leaderboard" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Leaderboard</NavLink>
            <NavLink to="/myLeagueRecords" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Leagues</NavLink>
            <NavLink to="/profile" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Profile</NavLink>
            <NavLink to="/community-forum" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Community</NavLink>
            <NavLink to="/guides" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Guides</NavLink>
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
      ) : authStatusSponsor ? (
        <div className='header public-header' style={headerStyles}>
          <div className='logoimg'>
            <NavLink to="/">
              <img src={Logo} alt="Logo" />
            </NavLink>
          </div>

          <div className='anchorLinksWrapper'>
          
          <a href="/home/" className='anchorlinks'>Home</a>
           
            <NavLink to="/playforfree" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Play for free</NavLink>
            <NavLink to="/community-forum" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Community</NavLink>
            <NavLink 
        className={`anchorlinks fightsubmenu ${isFightsActive ? 'activeLink' : ''}`}
        onClick={toggleSubmenu}
        ref={submenuRef}
      >
        Fights
        <div className={`submenu ${submenuOpen ? 'submenuOpen' : 'submenuClosedclass'}`}  style={{
      pointerEvents: submenuOpen ? 'auto' : 'none' // Disable pointer events when closed
    }}>
          <NavLink to="/upcomingfights" className="submenuLink">Upcoming Fights</NavLink>
          <NavLink to="/past-fights" className="submenuLink">Past Fights</NavLink>
          <NavLink to="/our-fighters" className="submenuLink">Our Fighters</NavLink>
          <NavLink to="/past-fights-records" className="submenuLink">Past Fights Videos</NavLink>
          <NavLink to="/fights-rewards" className="submenuLink">Fight Rewards</NavLink>
          <NavLink to="/fights-news" className="submenuLink">Fight News</NavLink>
        </div>
      </NavLink>
 
           
            <NavLink to="/Sponsors" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Sponsors</NavLink>
            <NavLink to="/faqs" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Faqs</NavLink>
           
          </div>

          <div className='sideLinkswrap'>
            <NavLink  className='joinNowBtn' to="/login" onClick={handleLogoutSponsor}>Logout</NavLink>
          </div>

          <div className='menuIconFont' onClick={toggleMenu}><i className="fa fa-bars"></i></div>
        </div>
      ) : (
        <div className='header public-header' style={headerStyles}>
          <div className='logoimg'>
            <NavLink to="/">
              <img src={Logo} alt="Logo" />
            </NavLink>
          </div>

          <div className='anchorLinksWrapper'>
          
          <a href="/home/" className='anchorlinks'>Home</a>
           
            <NavLink to="/playforfree" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Play for free</NavLink>
            <NavLink to="/community-forum" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Community</NavLink>
            <NavLink 
        className={`anchorlinks fightsubmenu ${isFightsActive ? 'activeLink' : ''}`}
        onClick={toggleSubmenu}
        ref={submenuRef}
      >
        Fights
        <div className={`submenu ${submenuOpen ? 'submenuOpen' : 'submenuClosedclass'}`}  style={{
      pointerEvents: submenuOpen ? 'auto' : 'none' // Disable pointer events when closed
    }}>
          <NavLink to="/upcomingfights" className="submenuLink">Upcoming Fights</NavLink>
          <NavLink to="/past-fights" className="submenuLink">Past Fights</NavLink>
          <NavLink to="/our-fighters" className="submenuLink">Our Fighters</NavLink>
          <NavLink to="/past-fights-records" className="submenuLink">Past Fights Videos</NavLink>
          <NavLink to="/fights-rewards" className="submenuLink">Fight Rewards</NavLink>
          <NavLink to="/fights-news" className="submenuLink">Fight News</NavLink>
          <NavLink to="/global-leaderboard" className="submenuLink">Fighters Leaderboard</NavLink>
          </div>
      </NavLink>
 
           
            <NavLink to="/Sponsors" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Sponsors</NavLink>
            <NavLink to="/faqs" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Faqs</NavLink>
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Login</NavLink>
          
          </div>

          <div className='sideLinkswrap'>
            <NavLink to="/CreateAccount" className='joinNowBtn'>Sign Up Now</NavLink>
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
              <NavLink to="/AffiliatePromotion" className='anchorlinks' onClick={closeMenu}>Insights</NavLink>
              <NavLink to="/affiliate-guides" className='anchorlinks' onClick={closeMenu}>Guides</NavLink>
        
              <button onClick={() => { handleLogoutAffiliate(); closeMenu(); }} className='anchorlinks logoutButton' style={{ background: 'transparent', border: 'none', outline: 'none' }}>
                <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
              </button>
            </>
          ) : isAuthenticated ? (
            <>
           
              <NavLink to="/YourFights" className='anchorlinks' onClick={closeMenu}>Your Fights</NavLink>
              <NavLink to="/leaderboard" className='anchorlinks' onClick={closeMenu}>Leaderboard</NavLink>
              <NavLink to="/myLeagueRecords" className='anchorlinks' onClick={closeMenu}>Leagues</NavLink>
              <NavLink to="/profile" className='anchorlinks' onClick={closeMenu}>Profile</NavLink>
              <NavLink to="/guides" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')}>Guides</NavLink>
              <NavLink to="/community-forum" className='anchorlinks' onClick={closeMenu}>Community</NavLink>
                 <NavLink to="/UserDashboard" className='anchorlinks' onClick={closeMenu}>Dashboard</NavLink>
              <button onClick={() => { handleLogout(); closeMenu(); }} className='anchorlinks logoutButton' style={{ background: 'transparent', border: 'none', outline: 'none' }}>
                <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
              </button>
            </>
          ) : authStatusSponsor ? (
            <>
            <a href="/home/" className='anchorlinks'>Home</a>
             <NavLink to="/playforfree" className='anchorlinks' onClick={closeMenu}>Play for free</NavLink>
              <NavLink to="/community-forum" className='anchorlinks' onClick={closeMenu}>Community</NavLink>
              <NavLink to="/upcomingfights" className='anchorlinks' onClick={closeMenu}>Upcoming Fights</NavLink>
              <NavLink to="/past-fights" className='anchorlinks' onClick={closeMenu}>Past Fights</NavLink>
              <NavLink to="/Sponsors" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')} onClick={closeMenu}>Sponsors</NavLink>
              <NavLink to="/login" className='anchorlinks' onClick={handleLogoutSponsor}>
                <i className="fa fa-sign-in" aria-hidden="true"></i> Logout
              </NavLink>
            </>
          ) : (
            <>
            
          <a href="/home/" className='anchorlinks'>Home</a>
             <NavLink to="/playforfree" className='anchorlinks' onClick={closeMenu}>Play for free</NavLink>
              <NavLink to="/community-forum" className='anchorlinks' onClick={closeMenu}>Community</NavLink>
              <NavLink to="/upcomingfights" className='anchorlinks' onClick={closeMenu}>Upcoming Fights</NavLink>
              <NavLink to="/CreateAccount" className='anchorlinks' onClick={closeMenu}>Create account</NavLink>
              <NavLink to="/past-fights" className='anchorlinks' onClick={closeMenu}>Past Fights</NavLink>
              <NavLink to="/Sponsors" className={({ isActive }) => (isActive ? 'anchorlinks activeLink' : 'anchorlinks')} onClick={closeMenu}>Sponsors</NavLink>
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
