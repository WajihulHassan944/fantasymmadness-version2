import React, { useEffect, useState } from 'react';
import FighterOne from "../../Assets/fighterOne.png";
import "./RegisteredUsers.css";
const RegisteredUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch the data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('https://fantasymmadness-game-server-three.vercel.app/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://fantasymmadness-game-server-three.vercel.app/usertodelete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter(user => user._id !== id));
        alert('User deleted successfully');
      } else {
        alert('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className='adminWrapper'>
      <div className='homeThird' style={{ background: 'transparent' }}>
        <h1 className='thirdHeadingOne'>Registered Users</h1>
        <div className='leaderboardItemsWrap'>
          {users.map((user) => (
            <div key={user._id} className='leaderboardItem'>
              <div className='leaderboard-item-image'>
                <img src={user.profileUrl || FighterOne} alt={`${user.firstName} ${user.lastName}`} />
              </div>
              <h1>{`${user.firstName} ${user.lastName}`}</h1>
              <h1>Current Plan: {user.currentPlan}</h1>
              <button onClick={() => handleView(user)} className='viewButton'>View</button>
              <button onClick={() => handleDelete(user._id)} className='deleteButton'>Delete</button>
            </div>
          ))}
        </div>
      </div>

      {selectedUser && (
        <div className='userDetails'>
          <img src={selectedUser.profileUrl || FighterOne} alt={`${selectedUser.firstName} ${selectedUser.lastName}`} />
          <p><strong>Name:</strong> {`${selectedUser.firstName} ${selectedUser.lastName}`}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Phone:</strong> {selectedUser.phone}</p>
          <p><strong>Current Plan:</strong> {selectedUser.currentPlan}</p>
          <p><strong>Zip Code:</strong> {selectedUser.zipCode}</p>
          <p><strong>Verified:</strong> {selectedUser.verified ? 'Yes' : 'No'}</p>
          <button onClick={() => setSelectedUser(null)} className='closeButton'>Close</button>
        </div>
      )}
    </div>
  );
}

export default RegisteredUsers;
