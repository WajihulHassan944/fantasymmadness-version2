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
        const [venmoId, setVenmoId] = useState(
            affiliate?.preferredPaymentMethod === 'Venmo' ? affiliate.preferredPaymentMethodValue : ''
          );
          const [cashAppId, setCashAppId] = useState(
            affiliate?.preferredPaymentMethod === 'CashApp' ? affiliate.preferredPaymentMethodValue : ''
          );
          const [paypalEmail, setPaypalEmail] = useState(
            affiliate?.preferredPaymentMethod === 'PayPal' ? affiliate.preferredPaymentMethodValue : ''
          );
          
      
        const [loading, setLoading] = useState(false);
        const [loadingTwo, setLoadingTwo] = useState(false);
 // Disable other payment fields if one is filled
 const isVenmoDisabled = venmoId !== '';
 const isCashAppDisabled = cashAppId !== '';
 const isPaypalDisabled = paypalEmail !== '';

        if (!affiliate) {
            return <div>Loading...</div>;
          }             
        



        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoadingTwo(true);
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
                setLoadingTwo(false); // Set loading to false after the request is completed
            }
        };
    
    
        const handleSubmittingDetails = async (e) => {
            e.preventDefault();
            setLoading(true);
        
            // Determine which payment method is selected
            let preferredPaymentMethod = '';
            let preferredPaymentMethodValue = '';
        
            if (venmoId) {
              preferredPaymentMethod = 'Venmo';
              preferredPaymentMethodValue = venmoId;
            } else if (cashAppId) {
              preferredPaymentMethod = 'CashApp';
              preferredPaymentMethodValue = cashAppId;
            } else if (paypalEmail) {
              preferredPaymentMethod = 'PayPal';
              preferredPaymentMethodValue = paypalEmail;
            }
        
            try {
              const response = await fetch(`https://fantasymmadness-game-server-three.vercel.app/affiliate/updatePayment/${affiliate._id}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  preferredPaymentMethod,
                  preferredPaymentMethodValue,
                }),
              });
        
              if (!response.ok) {
                alert(response.message);
              }
        
              const data = await response.json();
              alert('Setting Saved successfully:', data);
              window.location.reload();
            } catch (error) {
              console.error('Error updating profile:', error);
            } finally {
              setLoading(false);
              
            }
          };

    

    
        return (
            <div className='myprofile'>
                <div className='member-header'>
                    <div className='member-header-image'>
                        <img src={affiliate.profileUrl} alt="Profile" />
                    </div>
                    <h3><span className='toRemove'>Affiliate Name - </span>{affiliate.firstName} {affiliate.lastName}</h3>
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
                    
    
                    <div className='divTwoProfile' style={{ marginTop: '1px' }}>
          <h1>Preferred payment method - choose 1</h1>
         <div className='input-group-profile'>
            <label>Venmo Id </label>
            <input
              type='text'
              value={venmoId}
              onChange={(e) => setVenmoId(e.target.value)}
              style={{color:'#fff'}}
            />
          </div>
          <div className='input-group-profile'>
            <label>Cash app Id </label>
            <input
              type='text'
              value={cashAppId}
              onChange={(e) => setCashAppId(e.target.value)}
              style={{color:'#fff'}}
            />
          </div>
          <div className='input-group-profile'>
            <label>Paypal Email Address </label>
            <input
              type='text'
              value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
              style={{color:'#fff'}}
            />
          </div>

          <button type="submit" className='btn-grad' style={{ width: '40%' }} onClick={handleSubmittingDetails}>
          {loading ? 'Saving!' : 'Save Settings'}
          </button>
        
        </div>


                </div>
            </div>
        );
    };
    

export default AffiliateProfile
