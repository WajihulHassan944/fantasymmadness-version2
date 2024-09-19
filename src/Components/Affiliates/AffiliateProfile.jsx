import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import cashapp from "../../Assets/cashapp.png";
import venmo from "../../Assets/venmo.png";
import paypal from "../../Assets/paypal.png";
import "./affiliateprofile.css";

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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    affiliate?.preferredPaymentMethod || ''
  );

  const [loading, setLoading] = useState(false);
  const [loadingTwo, setLoadingTwo] = useState(false);

  useEffect(() => {
    if (affiliate) {
      setFirstName(affiliate.firstName || '');
      setLastName(affiliate.lastName || '');
      setPlayerName(affiliate.playerName || '');
      setPhone(affiliate.phone || '');
      setZipCode(affiliate.zipCode || '');
      setShortBio(affiliate.shortBio || '');
      setSelectedPaymentMethod(affiliate.preferredPaymentMethod || '');
      const paymentValue = affiliate.preferredPaymentMethodValue || '';
      if (affiliate.preferredPaymentMethod === 'Venmo') setVenmoId(paymentValue);
      else if (affiliate.preferredPaymentMethod === 'CashApp') setCashAppId(paymentValue);
      else if (affiliate.preferredPaymentMethod === 'PayPal') setPaypalEmail(paymentValue);
    }
  }, [affiliate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingTwo(true);
    try {
      const response = await fetch(`https://fantasymmadness-game-server-three.vercel.app/update-profile-affiliate/${affiliate._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          playerName,
          phone,
          zipCode,
          shortBio,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      alert('Profile updated successfully:', data);
      // Optionally update Redux store or other state management here
      // window.location.reload(); // Consider removing this if you update the state without reloading
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoadingTwo(false);
    }
  };

  const handleSubmittingDetails = async (e) => {
    e.preventDefault();
    setLoading(true);

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
      alert("Please enter a valid payment method.");
      setLoading(false);
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
        alert('Failed to save payment method.');
      } else {
        const data = await response.json();
        alert('Settings saved successfully.');
        // Optionally update Redux store or other state management here
      }
    } catch (error) {
      console.error('Error updating payment method:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!affiliate) {
    return <div>Loading...</div>;
  }

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

          <button type="submit" className='btn-grad'>
            {loadingTwo ? 'Saving!' : 'Save Settings'}
          </button>
        </form>

        <div className='divTwoProfile' style={{ marginTop: '1px' }}>
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
    {loading ? 'Saving!' : 'Save Settings'}
  </button>
</div>

      </div>
    </div>
  );
};

export default AffiliateProfile;
