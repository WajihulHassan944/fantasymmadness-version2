import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import "./Profile.css";
import { useNavigate } from 'react-router-dom';
import AddTokensToWallet from './AddTokensToWallet';

const Profile = () => {
    const user = useSelector((state) => state.user); // Access user details from Redux store
const navigate = useNavigate();
    // Local state to manage form inputs
    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');
    const [playerName, setPlayerName] = useState(user.playerName || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [zipCode, setZipCode] = useState(user.zipCode || '');
    const [shortBio, setShortBio] = useState(user.shortBio || '');

    const [loading, setLoading] = useState(false);
    const [showPredictions, setShowPredictions] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`https://fantasymmadness-game-server-three.vercel.app/update-profile/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    playerName,
                    phone,
                    zipCode,
                    shortBio
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const data = await response.json();
            alert('Profile updated successfully:', data);
            window.location.reload();
           
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setLoading(false); // Set loading to false after the request is completed
        }
    };



    

  const handleAddTokenClick = async () => {
    setShowPredictions(true);
  };


  if (showPredictions) {
    return  <AddTokensToWallet userId={user._id} />
    
  }

    return (
        <div className='myprofile'>
            <div className='member-header'>
                <div className='member-header-image'>
                    <img src={user.profileUrl} alt="Profile" />
                </div>
                <h3><span className='toRemove'>Member Name - </span>{user.firstName} {user.lastName}</h3>
                <h3><span className='toRemove'>Current</span> Plan: {user.currentPlan}</h3>
            </div>

            <div className='fightwalletWrap'>
                <div className='fightWallet'>
                    <h1 style={{ textAlign: 'center' }}><i className="fa fa-shopping-bag" aria-hidden="true"></i> Fight Wallet</h1>
                    <h2>Tokens Remaining: <span>{user.tokens}</span></h2>
                </div>
            </div>

            <div className='createAccount' style={{ background: 'transparent', marginTop: '-100px' }}>
                <form className='registerCard' onSubmit={handleSubmit}>
                    <h1>Edit your profile</h1>

                    <div className='input-wrap-one'>
                        <div className='input-group'>
                            <label>First Name <span>*</span></label>
                            <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className='input-group'>
                            <label>Last Name <span>*</span></label>
                            <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>

                    <div className='input-wrap-two'>
                        <div className='input-group'>
                            <label>User Name? <span>*</span></label>
                            <input type='text' value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
                        </div>
                        <i className="fa fa-refresh" aria-hidden="true"></i>
                    </div>

                    <div className='input-wrap-one'>
                        <div className='input-group'>
                            <label>Your Phone <span className='toRemove'>(Mobile)</span> <span>*</span></label>
                            <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className='input-group'>
                            <label>Zip Code <span>*</span></label>
                            <input type='text' value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                        </div>
                    </div>

                    <div className='termsConditions'>
                        <h2>Your Short Bio</h2>
                        <textarea
                            style={{ width: '100%', border: 'none', minHeight: '10vh' }}
                            value={shortBio}
                            onChange={(e) => setShortBio(e.target.value)}
                        ></textarea>
                    </div>

                    <button type="submit" className='btn-grad' >
                        {loading ? 'Saving!' : 'Save Settings'}
                    </button>
                </form>
                

            <div className='divTwoProfile' >
            
            {/*       <button type="submit" className='btn-grad profile-btn' style={{width:'40%'}}>Delete My Account</button> */}
                   <button type="submit" className='btn-grad profile-btn' style={{width:'40%'}}>Cancel My Subscription</button>
                   <button type="submit" className='btn-grad profile-btn' style={{width:'40%'}} onClick={() => handleAddTokenClick()}>Add tokens to Wallet</button>
                  <div className='pairOfHtags'>
                   <h1>Your Public player profile link:</h1>
                   <h1>http://localhost:3000/{user._id}</h1>
   
   </div>
   
   <h1>Prefered payment method-choose 1</h1>
                       <div className='input-group-profile'>
                           <label>Venmo Id </label>
                           <input type='text' />
                       </div>
                       <div className='input-group-profile'>
                           <label>Cash app Id </label>
                           <input type='text' />
                       </div>
                       <div className='input-group-profile'>
                           <label>Paypal Email Address </label>
                           <input type='text' />
                       </div>
   
                       <button type="submit" className='btn-grad ' style={{width:'40%'}}>Save settings</button>
                  
                               </div>
            </div>
        </div>
    );
};

export default Profile;
