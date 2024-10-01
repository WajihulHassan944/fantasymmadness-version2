import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import "./Profile.css";
import { useNavigate } from 'react-router-dom';
import AddTokensToWallet from './AddTokensToWallet';
import cashapp from "../../Assets/cashapp.png";
import venmo from "../../Assets/venmo.png";
import paypal from "../../Assets/paypal.png";
import { toast } from 'react-toastify';
import MembershipCheckout from '../CreateAccount/MembershipCheckout';


const Profile = () => {
    const user = useSelector((state) => state.user); // Access user details from Redux store
const navigate = useNavigate();
    // Local state to manage form inputs
    const [firstName, setFirstName] = useState(user.firstName || '');
   
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(user.isNotificationsEnabled || false);
    const [isSubscribed, setIsSubscribed] = useState(user.isSubscribed || false);
    const [isUSCitizen, setIsUSCitizen] = useState(user.isUSCitizen || false);
    const [email, setemail] = useState(user.email || '');

    const [lastName, setLastName] = useState(user.lastName || '');
    const [playerName, setPlayerName] = useState(user.playerName || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [zipCode, setZipCode] = useState(user.zipCode || '');
    const [shortBio, setShortBio] = useState(user.shortBio || '');
    const [venmoId, setVenmoId] = useState(
        user?.preferredPaymentMethod === 'Venmo' ? user.preferredPaymentMethodValue : ''
      );
      const [cashAppId, setCashAppId] = useState(
        user?.preferredPaymentMethod === 'CashApp' ? user.preferredPaymentMethodValue : ''
      );
      const [paypalEmail, setPaypalEmail] = useState(
        user?.preferredPaymentMethod === 'PayPal' ? user.preferredPaymentMethodValue : ''
      );
      const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
        user?.preferredPaymentMethod || ''
      );

      const [loadingTwo, setLoadingTwo] = useState(false);
const [membershipGo, setMembershipGo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPredictions, setShowPredictions] = useState(false);
    useEffect(() => {
      if (user) {
          setFirstName(user.firstName || '');
          setLastName(user.lastName || '');
          setPlayerName(user.playerName || '');
          setemail(user.email || '');
          
          setPhone(user.phone || '');
          setZipCode(user.zipCode || '');
          setShortBio(user.shortBio || '');
          setSelectedPaymentMethod(user.preferredPaymentMethod || '');
          
          const paymentValue = user.preferredPaymentMethodValue || '';
          if (user.preferredPaymentMethod === 'Venmo') setVenmoId(paymentValue);
          else if (user.preferredPaymentMethod === 'CashApp') setCashAppId(paymentValue);
          else if (user.preferredPaymentMethod === 'PayPal') setPaypalEmail(paymentValue);
  
          // Set the new fields
          setIsNotificationsEnabled(user.isNotificationsEnabled || false); // Handle notifications preference
          setIsSubscribed(user.isSubscribed || false);                     // Handle subscription status
          setIsUSCitizen(user.isUSCitizen || false);                     // Handle citizenship status
      }
  }, [user]);

  
  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      const updateProfilePromise = new Promise(async (resolve, reject) => {
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
                      shortBio,
                      isNotificationsEnabled, // Include the notifications preference
                      isSubscribed,           // Include the subscription status
                      isUSCitizen             // Include the citizenship status
                  })
              });
  
              if (!response.ok) {
                  reject(new Error('Failed to update profile')); // Reject if response isn't ok
              } else {
                  const data = await response.json();
                  resolve(data); // Resolve with the response data
              }
          } catch (error) {
              console.error('Error updating profile:', error);
              reject(new Error('Error updating profile')); // Reject on error
          }
      });
  
      // Use toast.promise to handle pending, success, and error states
      toast.promise(updateProfilePromise, {
          pending: 'Updating profile...',
          success: {
              render({ data }) {
                  return `Profile updated successfully! 👌`; // Display success message
              },
          },
          error: {
              render({ data }) {
                  return data.message || 'Failed to update profile'; // Display error message
              }
          }
      }).finally(() => {
          setLoading(false); // Reset loading state after promise settles
      });
  };
   

    const handleSubmittingDetails = async (e) => {
      e.preventDefault();
      setLoadingTwo(true);
    
      let preferredPaymentMethod = '';
      let preferredPaymentMethodValue = '';
    
      if (venmoId.trim()) {
        preferredPaymentMethod = 'Venmo';
        preferredPaymentMethodValue = venmoId;
      } else if (cashAppId.trim()) {
        preferredPaymentMethod = 'CashApp';
        preferredPaymentMethodValue = cashAppId;
      } else if (paypalEmail.trim()) {
        preferredPaymentMethod = 'PayPal';
        preferredPaymentMethodValue = paypalEmail;
      } else {
        toast.error("Please enter a valid payment method."); // Replacing alert with toast error
        setLoadingTwo(false);
        return;
      }
    
      // Clear other fields based on the selected method
      if (preferredPaymentMethod === 'Venmo') {
        setCashAppId('');
        setPaypalEmail('');
      } else if (preferredPaymentMethod === 'CashApp') {
        setVenmoId('');
        setPaypalEmail('');
      } else if (preferredPaymentMethod === 'PayPal') {
        setVenmoId('');
        setCashAppId('');
      }
    
      const updatePaymentPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await fetch(`https://fantasymmadness-game-server-three.vercel.app/user/updatePayment/${user._id}`, {
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
            reject(new Error('Failed to save payment method.')); // Reject if response isn't ok
          } else {
            const data = await response.json();
            resolve(data); // Resolve with the response data
          }
        } catch (error) {
          console.error('Error updating payment method:', error);
          reject(new Error('Error updating payment method.')); // Reject on error
        }
      });
    
      // Use toast.promise to handle pending, success, and error states
      toast.promise(updatePaymentPromise, {
        pending: 'Saving payment method...',
        success: 'Settings saved successfully! 👌',
        error: {
          render({ data }) {
            return data.message || 'Failed to save payment method';
          }
        }
      }).finally(() => {
        setLoadingTwo(false); // Reset loading state after promise settles
      });
    };
    
    

  const handleAddTokenClick = async () => {
    setShowPredictions(true);
  };

  const handlepaymentDetailsClick = async () => {
    setMembershipGo(true);
  };

  
  if (showPredictions) {
    return  <AddTokensToWallet userId={user._id} />
    
  }

  if (membershipGo) {
    return  <MembershipCheckout userId={user._id} email={user.email} name={user.firstName + ' ' + user.lastName} avatar={user.profileUrl}  />
    
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

            <div className='createAccount' style={{ background: 'transparent'}}>
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

                    <div className='input-wrap-one'>
                        <div className='input-group' >
                            <label>Email</label>
                            <input type='text' value={email} disabled style={{background:'#fff', color:'gray' , pointerEvents:'none'}} />
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






        <div className="checking" style={{ backgroundColor: "#367cde", color: '#333' }}>
            <label className="custom-radio-label">
                <input
                    type="checkbox"
                    name="isNotificationsEnabled"
                    checked={isNotificationsEnabled}
                    onChange={(e) => setIsNotificationsEnabled(e.target.checked)}
                />
                <span className={`custom-radio ${isNotificationsEnabled ? 'checked' : ''}`}></span>
                I would like to be sent activity notifications via SMS
            </label>
        </div>

        <div className="checking">
            <label className="custom-radio-label">
                <input
                    type="checkbox"
                    name="isSubscribed"
                    checked={isSubscribed}
                    onChange={(e) => setIsSubscribed(e.target.checked)}
                />
                <span className={`custom-radio ${isSubscribed ? 'checked' : ''}`}></span>
                Subscribe to fmma E-list for updates and promotions
            </label>
        </div>

        <div className="checking" style={{ backgroundColor: '#fff' }}>
            <label className="custom-radio-label">
                <input
                    type="checkbox"
                    name="isUSCitizen"
                    checked={isUSCitizen}
                    onChange={(e) => setIsUSCitizen(e.target.checked)}
                />
                <span className={`custom-radio ${isUSCitizen ? 'checked' : ''}`}></span>
                I am a US citizen and reside in the United States
            </label>
        </div>

                    <div className="checking">
                        <label className="custom-radio-label">
                            <input
                                type="checkbox"
                                name="isAgreed"
                                checked={true}
                            />
                            <span className={`custom-radio ${'checked'}`}></span>
                            I have read and agree to the terms and conditions
                        </label>
                    </div>


                    <button type="submit" className='btn-grad' >
                        {loading ? 'Saving!' : 'Save Settings'}
                    </button>
                </form>
                
                <div className='divTwoProfile' >
                  {/*       <button type="submit" className='btn-grad profile-btn' style={{width:'40%'}}>Delete My Account</button> */}
                  <button type="submit" className='btn-grad profile-btn' style={{width:'40%'}} onClick={() => handlepaymentDetailsClick()}>My Payment Details</button>
                   <button type="submit" className='btn-grad profile-btn' style={{width:'40%'}} onClick={() => handleAddTokenClick()}>Add tokens to Wallet</button>
                  <div className='pairOfHtags'>
                   <h1>Your Public player profile link:</h1>
                   <h1>fantasymmadness.com/{user._id}</h1>
   
   </div>
  <h1>Preferred payment method - choose 1</h1>

  {/* Venmo */}
  <div className='inputParent'>
    <div className='input-group-profile'>
      <label style={{ color: '#4997cf' }}>Venmo Id </label>
      <input
        type='text'
        value={venmoId}
        onChange={(e) => {
          setVenmoId(e.target.value);
          setCashAppId(''); // Clear CashApp input
          setPaypalEmail(''); // Clear PayPal input
        }}
        style={{ color: '#fff', borderColor: '#4997cf' }}
      />
    </div>
    <label className='switch'>
      <input
        type='radio'
        name='paymentMethod'
        value='venmo'
        checked={selectedPaymentMethod === 'Venmo'}
        onChange={() => setSelectedPaymentMethod('Venmo')}
      />
      <span className='slider round'></span>
    </label>
    <img src={venmo} alt='Venmo' />
  </div>

  {/* Cash App */}
  <div className='inputParent'>
    <div className='input-group-profile'>
      <label style={{ color: '#00d54b' }}>Cash app Id </label>
      <input
        type='text'
        value={cashAppId}
        onChange={(e) => {
          setCashAppId(e.target.value);
          setVenmoId(''); // Clear Venmo input
          setPaypalEmail(''); // Clear PayPal input
        }}
        style={{ color: '#fff', borderColor: '#00d54b' }}
      />
    </div>
    <label className='switch'>
      <input
        type='radio'
        name='paymentMethod'
        value='cashApp'
        checked={selectedPaymentMethod === 'CashApp'}
        onChange={() => setSelectedPaymentMethod('CashApp')}
      />
      <span className='slider round'></span>
    </label>
    <img src={cashapp} alt='Cash App' />
  </div>

  {/* PayPal */}
  <div className='inputParent'>
    <div className='input-group-profile'>
      <label style={{ color: '#0773c3' }}>Paypal Email Address </label>
      <input
        type='text'
        value={paypalEmail}
        onChange={(e) => {
          setPaypalEmail(e.target.value);
          setVenmoId(''); // Clear Venmo input
          setCashAppId(''); // Clear CashApp input
        }}
        style={{ color: '#fff', borderColor: '#0773c3' }}
      />
    </div>
    <label className='switch'>
      <input
        type='radio'
        name='paymentMethod'
        value='paypal'
        checked={selectedPaymentMethod === 'PayPal'}
        onChange={() => setSelectedPaymentMethod('PayPal')}
      />
      <span className='slider round'></span>
    </label>
    <img src={paypal} alt='PayPal' />
  </div>

  {/* Submit Button */}
  <button type="submit" className='btn-grad' style={{ width: '40%' }} onClick={handleSubmittingDetails}>
    {loadingTwo ? 'Saving!' : 'Save Settings'}
  </button>
</div>




            </div>
        </div>
    );
};

export default Profile;
