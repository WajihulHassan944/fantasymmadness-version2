import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Admin.css';

const Admin = () => {
  const [dashboardCounts, setDashboardCounts] = useState({
    affiliatesCount: 0,
    matchesCount: 0,
    usersCount: 0,
    shadowTemplatesCount: 0,
    totalClicks: 0, // Add totalClicks state
  });

  const [showResetPopup, setShowResetPopup] = useState(false); // State for showing/hiding popup
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

  // Function to reset stats
  const handleResetStats = async () => {
    try {
      const response = await fetch('https://fantasymmadness-game-server-three.vercel.app/reset-stats', {
        method: 'POST',
      });
      if (response.ok) {
        alert('Stats have been reset successfully.');
        setDashboardCounts((prev) => ({ ...prev, totalClicks: 0 })); // Reset total clicks in the UI
        setShowResetPopup(false); // Close the popup
      } else {
        console.error('Failed to reset stats');
        alert('Failed to reset stats');
      }
    } catch (error) {
      console.error('Error resetting stats:', error);
      alert('Error resetting stats');
    }
  };

  // Destructure the counts from the state
  const { affiliatesCount, matchesCount, usersCount, shadowTemplatesCount, totalClicks } = dashboardCounts;

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

        <div
          className='boxx visitors'
          onClick={() => setShowResetPopup(true)} // Show the popup on click
        >
          <i className='fa fa-eye'></i>
          <h2>Visitors</h2>
          <p>{totalClicks}</p> {/* Render total clicks (visitors count) */}
        </div>
      </div>

      {/* Popup for Reset Confirmation */}
      {showResetPopup && (
        <div className='popupOverlay'>
          <div className='popupContent'>
            <h3>Reset All Stats</h3>
            <p>Are you sure you want to reset visitor stat? This action cannot be undone.</p>
            <div className='popupActions'>
              <button className='confirmBtn' onClick={handleResetStats}>
                Confirm
              </button>
              <button className='cancelBtn' onClick={() => setShowResetPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
