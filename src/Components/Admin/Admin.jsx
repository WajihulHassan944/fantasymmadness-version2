import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../../Redux/matchSlice';  // Assuming you have a slice for matches
import './Admin.css';

const Admin = () => {
  const dispatch = useDispatch();

  // Redux state selectors
  const matches = useSelector((state) => state.matches.data);
  const matchStatus = useSelector((state) => state.matches.status);

  const [affiliatesCount, setAffiliatesCount] = React.useState(0);
  const [usersCount, setUsersCount] = React.useState(0);
  const [templatesCount, setTemplatesCount] = React.useState(0);

  // Fetch matches from Redux
  useEffect(() => {
    if (matchStatus === 'idle') {
      dispatch(fetchMatches());
    }
  }, [matchStatus, dispatch]);

  // Fetch affiliates count
  useEffect(() => {
    const fetchAffiliates = async () => {
      const response = await fetch('https://fantasymmadness-game-server-three.vercel.app/affiliates');
      const data = await response.json();
      setAffiliatesCount(data.length);  // Assuming the data is an array
    };
    fetchAffiliates();
  }, []);

  // Fetch users count
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://fantasymmadness-game-server-three.vercel.app/users');
      const data = await response.json();
      setUsersCount(data.length);  // Assuming the data is an array
    };
    fetchUsers();
  }, []);

  // Fetch shadow templates count
  useEffect(() => {
    const fetchTemplates = async () => {
      const response = await fetch('https://fantasymmadness-game-server-three.vercel.app/shadow');
      const data = await response.json();
      setTemplatesCount(data.length);  // Assuming the data is an array
    };
    fetchTemplates();
  }, []);

  return (
    <div className='adminWrapper' style={{flexDirection: 'column', gap: '50px'}}>
      <h1 className='frontPageHeading'>Welcome to admin Dashboard</h1>

      <div className='boxesContainer'>
        <div className='boxx totalMatches'>
          <i className='fa fa-futbol-o'></i>
          <h2>Total Matches</h2>
          <p>{matches?.length || 0}</p> {/* Render total matches */}
        </div>

        <div className='boxx shadowTemplates'>
          <i className='fa fa-clone'></i>
          <h2>Shadow Templates</h2>
          <p>{templatesCount}</p> {/* Render shadow templates count */}
        </div>

        <div className='boxx registeredUsers'>
          <i className='fa fa-users'></i>
          <h2>Registered Users</h2>
          <p>{usersCount}</p> {/* Render users count */}
        </div>

        <div className='boxx affiliates'>
          <i className='fa fa-handshake-o'></i>
          <h2>Affiliates</h2>
          <p>{affiliatesCount}</p> {/* Render affiliates count */}
        </div>
      </div>
    </div>
  );
};

export default Admin;
