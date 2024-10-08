import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Admin.css';

const Admin = () => {
  const [dashboardCounts, setDashboardCounts] = useState({
    affiliatesCount: 0,
    matchesCount: 0,
    usersCount: 0,
    shadowTemplatesCount: 0,
  });

  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch all dashboard counts from the API
  useEffect(() => {
    const fetchDashboardCounts = async () => {
      try {
        const response = await fetch('https://fantasymmadness-game-server-three.vercel.app/dashboard-counts');
        const data = await response.json();
        setDashboardCounts(data);
      } catch (error) {
        console.error('Error fetching dashboard counts:', error);
      }
    };

    fetchDashboardCounts();
  }, []);

  // Destructure the counts from the state
  const { affiliatesCount, matchesCount, usersCount, shadowTemplatesCount } = dashboardCounts;

  return (
    <div className='adminWrapper' style={{ flexDirection: 'column', gap: '50px' }}>
      <h1 className='frontPageHeading'>Welcome to admin Dashboard</h1>

      <div className='boxesContainer'>
        <div className='boxx totalMatches' onClick={() => navigate('/administration/upcomingFights')}>
          <i className='fa fa-futbol-o'></i>
          <h2>Total Matches</h2>
          <p>{matchesCount}</p> {/* Render total matches */}
        </div>

        <div className='boxx shadowTemplates' onClick={() => navigate('/administration/ShadowFightsLibrary')}>
          <i className='fa fa-clone'></i>
          <h2>Shadow Templates</h2>
          <p>{shadowTemplatesCount}</p> {/* Render shadow templates count */}
        </div>

        <div className='boxx registeredUsers' onClick={() => navigate('/administration/RegisteredUsers')}>
          <i className='fa fa-users'></i>
          <h2>Registered Users</h2>
          <p>{usersCount}</p> {/* Render users count */}
        </div>

        <div className='boxx affiliates' onClick={() => navigate('/administration/AffiliateUsers')}>
          <i className='fa fa-handshake-o'></i>
          <h2>Affiliates</h2>
          <p>{affiliatesCount}</p> {/* Render affiliates count */}
        </div>
      </div>
    </div>
  );
};

export default Admin;
