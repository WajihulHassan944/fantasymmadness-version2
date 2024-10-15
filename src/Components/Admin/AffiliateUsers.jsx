import React, { useState, useEffect } from 'react';
import "./AffiliateUsers.css";
import UserDetails from './UserDetails';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AffiliateUsers = () => {
  const [affiliateUsers, setAffiliateUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // 'All', 'Approved', 'Pending'
  const [selectedUser, setSelectedUser] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
const [deleteText, setDeleteText] = useState("Delete");
const navigate = useNavigate();


  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('https://fantasymmadness-game-server-three.vercel.app/affiliates');
        const data = await response.json();
        setAffiliateUsers(data);
        setFilteredUsers(data); // Initially, all users are displayed
      } catch (error) {
        console.error('Error fetching affiliate users:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter users based on search query and status filter
    const filtered = affiliateUsers.filter(user => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const matchesSearch = fullName.includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'All' || (filterStatus === 'Approved' && user.verified) || (filterStatus === 'Pending' && !user.verified);

      return matchesSearch && matchesStatus;
    });
    setFilteredUsers(filtered);
  }, [searchQuery, filterStatus, affiliateUsers]);

  const handleNavigation = () => {
    navigate('/administration/adminRecords');
  };

  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  const handleViewUserDetails = (user) => {
    setSelectedUser(user);
    setDetailsOpen(true);
  };

  if (detailsOpen && selectedUser) {
    console.log(selectedUser);
    return <UserDetails user={selectedUser} />;
  }

  const handleDeleteUser = async (id) => {
    const deleteUserPromise = new Promise(async (resolve, reject) => {
      try {
        setDeleteText("Deleting...");
        const response = await fetch(`https://fantasymmadness-game-server-three.vercel.app/affiliatetodelete/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          setAffiliateUsers(affiliateUsers.filter(user => user._id !== id)); // Update state after deletion
          resolve(); // Resolve the promise on success
        } else {
          reject(new Error('Delete Failed')); // Reject on error response
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        reject(new Error('Error deleting user')); // Reject on network error
      }
    });
  
    // Use toast.promise to handle pending, success, and error states
    toast.promise(deleteUserPromise, {
      pending: 'Deleting user...',
      success: 'User deleted successfully 👌',
      error: {
        render({ data }) {
          return data.message || 'Failed to delete user';
        }
      }
    }).finally(() => {
      setDeleteText("Delete"); // Revert button text after operation
    });
  };
  

  return (
    <div className='affiliateUsersWrapper'>
      <h1 className='thirdHeadingOne'>Affiliate Users</h1>

      <div className='searcDivAffiliate'> 
        <input
          type="text"
          placeholder='Affiliate Search'
          value={searchQuery}
          onChange={handleSearch}
        />
        <div className='searchDivPartTwo'>
          <h1
            onClick={() => handleFilter('Approved')}
            className={filterStatus === 'Approved' ? 'activeFilter' : ''}
          >
            Approved
          </h1>
         
          <h1
            onClick={() => handleFilter('Pending')}
            className={filterStatus === 'Pending' ? 'activeFilter' : ''}
          >
            Pending
          </h1>

          
          <h1 onClick={handleNavigation} style={{ cursor: 'pointer' }}>
      Admin Records
    </h1>
    
    <h1 onClick={() => navigate('/administration/payouts')} style={{ cursor: 'pointer' }}>
      Payouts
    </h1>
    
        </div>
      </div>

      <div className='userItemsParent'>
        <div className='userItemsWrapper'>
          <div className='userItemsHeader'>
           <h1>Profile</h1>
            <h1>First Name</h1>
            <h1>Last Name</h1>
            <h1>Status</h1>
            <h1>View</h1>
            <h1>Delete</h1>
          </div>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <div className='userItem' key={user._id}>
               <img src={user.profileUrl} />
                <h1>{user.firstName}</h1>
                <h1>{user.lastName}</h1>
                <h1>{user.verified ? 'Approved' : 'Pending'}</h1>
                <button className='viewButton' onClick={() => handleViewUserDetails(user)}>View</button>
                <button className='deleteButton' onClick={() => handleDeleteUser(user._id)}>{deleteText}</button>
              </div>
            ))
          ) : (
            <div className='noResults'>No users found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AffiliateUsers;
