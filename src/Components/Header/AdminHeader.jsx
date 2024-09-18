import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAdmin } from '../../Redux/adminAuthSlice'; // Import logoutAdmin action
import Logo from "../../Assets/logo.png";
import "./Header.css";

const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate('/'); // Redirect to admin login page after logout
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
    
      <div className='menuIconFontAdmin' onClick={toggleMenu}>
        <i className={menuOpen ? "fa fa-times" : "fa fa-bars"}></i>
      </div>
      
      <div className='adminLogo'>
        <img src={Logo} />
      </div>

        <div className={`admin-header ${menuOpen ? 'activeAdmin' : 'activeNotAdmin'}`}>
          <div>
            <center>
              <div className='logoimg'>
                <NavLink to="/">
                  <img src={Logo} alt="Logo" />
                </NavLink>
              </div>
            </center>

            <div className='anchorLinksWrapperAdmin'>
              <h1 className='matchHeading'>Matches</h1>
              <NavLink exact to="/administration/upcomingFights" className={({ isActive }) => (isActive ? 'anchorlinksAdmin activeLinkAdmin' : 'anchorlinksAdmin')}>Submit/View Scores</NavLink>
              <NavLink to="/administration/AddNewMatch" className={({ isActive }) => (isActive ? 'anchorlinksAdmin activeLinkAdmin' : 'anchorlinksAdmin')}>Create a Match</NavLink>
              <NavLink to="/administration/PreviousMatches" className={({ isActive }) => (isActive ? 'anchorlinksAdmin activeLinkAdmin' : 'anchorlinksAdmin')}>All / prev Matches</NavLink>
              <NavLink to="/administration/DeleteMatches" className={({ isActive }) => (isActive ? 'anchorlinksAdmin activeLinkAdmin' : 'anchorlinksAdmin')}>Delete Match</NavLink>
              <NavLink to="/administration/Calendar" className={({ isActive }) => (isActive ? 'anchorlinksAdmin activeLinkAdmin' : 'anchorlinksAdmin')}>Calandar of matches</NavLink>
              <NavLink to="/administration/ShadowFightsLibrary" className={({ isActive }) => (isActive ? 'anchorlinksAdmin activeLinkAdmin' : 'anchorlinksAdmin')}>Shadow Fights Library</NavLink>
              <NavLink to="/administration/YoutubeArchive" className={({ isActive }) => (isActive ? 'anchorlinksAdmin activeLinkAdmin' : 'anchorlinksAdmin')}>Youtube Archive</NavLink>
            
              <h1 className='matchHeading'>Users</h1>
              <NavLink to="/administration/RegisteredUsers" className={({ isActive }) => (isActive ? 'anchorlinksAdmin activeLinkAdmin' : 'anchorlinksAdmin')}>Registered Users</NavLink>
             {/* <NavLink to="/administration/SubscribedUsers" className={({ isActive }) => (isActive ? 'anchorlinksAdmin activeLinkAdmin' : 'anchorlinksAdmin')}>Subscribed Users</NavLink>
             */} <NavLink to="/administration/AffiliateUsers" className={({ isActive }) => (isActive ? 'anchorlinksAdmin activeLinkAdmin' : 'anchorlinksAdmin')}>Affiliate Users</NavLink>
              <NavLink to="/administration/Email" className={({ isActive }) => (isActive ? 'anchorlinksAdmin activeLinkAdmin' : 'anchorlinksAdmin')}>Email Template</NavLink>
              
            </div>
          </div>

          <div className='sideLinkswrapAdmin'>
            <NavLink to="#" className="sideLinksAdmin" onClick={handleLogout}>
              <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
            </NavLink>
          </div>
        </div>
    
    </div>
  );
};

export default AdminHeader;
