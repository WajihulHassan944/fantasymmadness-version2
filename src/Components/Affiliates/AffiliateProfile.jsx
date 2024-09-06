import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const AffiliateProfile = () => {
   
  const affiliate = useSelector((state) => state.affiliateAuth.userAffiliate);



    const [firstName, setFirstName] = useState(affiliate?.firstName || '');
        const [lastName, setLastName] = useState(affiliate?.lastName || '');
        const [playerName, setPlayerName] = useState(affiliate?.playerName || '');
        const [phone, setPhone] = useState(affiliate?.phone || '');
        const [zipCode, setZipCode] = useState(affiliate?.zipCode || '');
        const [shortBio, setShortBio] = useState(affiliate?.shortBio || '');
    
        const [loading, setLoading] = useState(false);

        if (!affiliate) {
            return <div>Loading...</div>;
          }             
        
        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            try {
                const response = await fetch(`https://fantasymmadness-game-server-three.vercel.app/update-profile-affiliate/${affiliate._id}`, {
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
    
    
    

    
        return (
            <div className='myprofile'>
                <div className='member-header'>
                    <div className='member-header-image'>
                        <img src={affiliate.profileUrl} alt="Profile" />
                    </div>
                    <h3><span className='toRemove'>Member Name - </span>{affiliate.firstName} {affiliate.lastName}</h3>
                    <h3>Balance: -</h3>
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
                    
    
                <div className='divTwoProfile' style={{marginTop:'1px'}}>
                
                {/*       <button type="submit" className='btn-grad profile-btn' style={{width:'40%'}}>Delete My Account</button> */}
                       
       
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
    

export default AffiliateProfile
