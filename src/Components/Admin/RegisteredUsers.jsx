import React, { useEffect, useState } from 'react';
import FighterOne from "../../Assets/fighterOne.png";
import "./RegisteredUsers.css";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const RegisteredUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tokensToGive, setTokensToGive] = useState('');
const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await fetch('https://fantasymmadness-game-server-three.vercel.app/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  useEffect(() => {
    // Fetch the data from the API when the component mounts
  
    fetchData();
  }, []);
  const handleGiveTokens = async (userId) => {
    if (!tokensToGive || isNaN(tokensToGive) || tokensToGive <= 0) {
        return alert('Please enter a valid token amount.');
    }

    try {
        const response = await fetch(`https://fantasymmadness-game-server-three.vercel.app/api/reward-tokens-only-forcibly/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tokens: tokensToGive,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to reward tokens.');
        }

        // Clear the token input after successful submission
        setTokensToGive('');
        alert('Tokens rewarded successfully!');
        window.location.reload();
    } catch (error) {
        console.error('Error rewarding tokens:', error);
        alert('Error rewarding tokens. Please try again.');
    }
};


const handleDelete = async (id) => {
  const deletePromise = new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`https://fantasymmadness-game-server-three.vercel.app/usertodelete/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setUsers(users.filter(user => user._id !== id));
        resolve(); // Resolve the promise on success
      } else {
        reject(); // Reject if response isn't ok
      }
    } catch (error) {
      reject(); // Reject on error
    }
  });

  toast.promise(deletePromise, {
    pending: 'Deleting user...',
    success: 'User deleted successfully 👌',
    error: 'Failed to delete user 🤯',
  });
};

  
  
  
  const handleView = (user) => {
    setSelectedUser(user);
  };

  const handleSuspendAccount = async () => {
    // Logic to suspend the account
    try {
        const response = await fetch(`https://fantasymmadness-game-server-three.vercel.app/redusers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: selectedUser.email, profileUrl: selectedUser.profileUrl }), // or any other required data
        });

        if (response.ok) {
            alert('User suspended successfully!');
            // Optionally, refresh the user list or perform any other actions
            window.location.reload();
        } else {
            alert('Failed to suspend the user. Please try again.');
        }
    } catch (error) {
        console.error('Error suspending user:', error);
        alert('Error suspending user. Please try again later.');
    }
};



  return (
    <div className='adminWrapper'>
   <i
        className="fa fa-arrow-circle-left"
        aria-hidden="true"
        onClick={() => navigate(-1)} // Go back to the previous page
        style={{ position: 'absolute', top: '38px', left: '18%', cursor: 'pointer', fontSize: '24px', color: '#007bff', zIndex: '99999' }}
      ></i>
   
      <div className='homeThird mobileItemOne' style={{ background: 'transparent' }}>
      <button className='suspendedAccountsBtn' onClick={()=>navigate('/administration/suspended-accounts')}>Suspended Accounts</button>
        <h1 className='thirdHeadingOne'>Registered Users</h1>
        <div className='leaderboardItemsWrap'>
          {users.map((user) => (
            <div key={user._id} className='leaderboardItem'>
              <div className='leaderboard-item-image'>
                <img src={user.profileUrl || FighterOne} alt={`${user.firstName} ${user.lastName}`} />
              </div>
              <h1>  {user.firstName} <span className='toRemove'>{user.lastName}</span></h1>
<h1 className='toRemove'>Current Plan: {user.currentPlan}</h1>
              <button onClick={() => handleView(user)} className='viewButtonUsers'>View</button>
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
        <p><strong>Preferred Payment method:</strong> {selectedUser.preferredPaymentMethod}</p>
        <p><strong>Payment Id:</strong> {selectedUser.preferredPaymentMethodValue}</p>
        <p><strong>Tokens:</strong> {selectedUser.tokens}</p>

        {/* Input field to give tokens */}
        <div className='giveTokens'>
    <input
        type='text'
        value={tokensToGive}
        onChange={(e) => setTokensToGive(e.target.value)}
        placeholder='Enter token amount'
        className='giveTokensInput' // Apply the updated class
    />
    <button onClick={() => handleGiveTokens(selectedUser._id)} className='submitTokensButton'> {/* Apply the updated class */}
        Submit
    </button>
</div>

<button className='closeButton' style={{background:'#ffc000', marginRight:'10px', fontWeight:'500'}} onClick={handleSuspendAccount}>Suspend Account</button>
        <button onClick={() => setSelectedUser(null)} className='closeButton'>Close</button>
    </div>
)}



    </div>
  );
}

export default RegisteredUsers;
