import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAdmin } from '../../Redux/adminAuthSlice'; // Import logoutAdmin action
import Logo from "../../Assets/logo.png";
import "./Header.css";

const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate('/'); // Redirect to admin login page after logout
  };

  return (
    <div>
      <div className='admin-header'>
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
            <NavLink to="/administration/upcomingFights" className={({ isActive }) => (isActive ? 'anchorlinksAdmin activeLink' : 'anchorlinksAdmin')}>Upcoming Fights</NavLink>
            <NavLink to="/administration/AddNewMatch" className={({ isActive }) => (isActive ? 'anchorlinksAdmin activeLink' : 'anchorlinksAdmin')}>Create a match</NavLink>
            <NavLink to="/administration/PreviousMatches" className={({ isActive }) => (isActive ? 'anchorlinksAdmin activeLink' : 'anchorlinksAdmin')}>All / prev matches</NavLink>
            <NavLink to="/administration/DeleteMatches" className={({ isActive }) => (isActive ? 'anchorlinksAdmin activeLink' : 'anchorlinksAdmin')}>Delete matches</NavLink>

            <h1 className='matchHeading'>Users</h1>
            <NavLink to="" className={({ isActive }) => (isActive ? 'anchorlinksAdmin activeLink' : 'anchorlinksAdmin')}>Registered Users</NavLink>
            <NavLink to="" className={({ isActive }) => (isActive ? 'anchorlinksAdmin activeLink' : 'anchorlinksAdmin')}>Subscriptions</NavLink>
            <NavLink to="" className={({ isActive }) => (isActive ? 'anchorlinksAdmin activeLink' : 'anchorlinksAdmin')}>All Users</NavLink>
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
