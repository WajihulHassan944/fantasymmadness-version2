import React, { useState } from 'react';
import "./MembershipCheckout.css";
import { Link, useNavigate } from 'react-router-dom';
import Cards from "../../Assets/visa-mastercard-amex_0.png";

const MembershipCheckout = ({ email, name, avatar }) => {
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    creditCardNumber: '',
    expMonth: '',
    expYear: '',
    securityCode: '',
    termsAccepted: false,
  });
const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setBillingInfo((prevInfo) => ({ ...prevInfo, termsAccepted: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(email);
    if (!billingInfo.termsAccepted) {
      alert('Please accept the terms and conditions');
      return;
    }
console.log(billingInfo);
    try {
      const response = await fetch(`https://fantasymmadness-game-server-three.vercel.app/user/${email}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: 'Standard'
         
        }),
      });

      if (response.ok) {
        alert('Subscription updated successfully');
        // Redirect or update UI as needed
        navigate('/login');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error updating subscription');
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
      alert('An error occurred while updating your subscription. Please try again later.');
    }
  };

  return (
    <div className='membership-chackout-wrapper'>
      <div className='member-header'>
        <div className='member-header-image'>
          <img src={avatar} alt="Logo" />
        </div>
        <h3><span className='toRemove'>Member Name - </span>{name}</h3>
        <h3><span className='toRemove'>Current </span>Plan: None</h3>
      </div>

      <div className='mermbership-cards'>
        <div className='cardone'>
          <h1 className='cardHeading'>Standard membership</h1>
          <div className='cardprice'>
            <div className="ribbon">
              <span>Tokens</span>
            </div>
            <p>$</p>
            <div className='cardprice-two'>
              <h1>10</h1>
              <h2>Monthly</h2>
            </div>
            <p>00</p>
          </div>
          <div className='card-features'>
            <li>Access to dashboard</li>
            <li>Tokens can accumulate</li>
            <li>Play and win prizes</li>
            <li>Share fight portfolio</li>
            <li>Get on the FMMA Leaderboard</li>
          </div>
          <button className='btn-grad' >SELECTED</button>
          <h2 className='cardCoupon'>Coupon Applied <br /><br /> 10 Free Tokens <br /> 50% Off First Month <br /> Total: $5.00</h2>
        </div>

        <div className='billingInformation'>
          <h2>Billing Information</h2>
          <div className='input-group'>
            <label>First Name</label>
            <input type='text' name="firstName" value={billingInfo.firstName} onChange={handleInputChange} />
          </div>
          <div className='input-group'>
            <label>Last Name</label>
            <input type='text' name="lastName" value={billingInfo.lastName} onChange={handleInputChange} />
          </div>
          <div className='input-group'>
            <label>Address</label>
            <input type='text' name="address" value={billingInfo.address} onChange={handleInputChange} />
          </div>
          <div className='input-group'>
            <label>City</label>
            <input type='text' name="city" value={billingInfo.city} onChange={handleInputChange} />
          </div>
          <div className='input-group input-group-state'>
            <label>State</label>
            <input type='text' name="state" value={billingInfo.state} onChange={handleInputChange} />
          </div>
          <div className='input-group input-group-zipcode'>
            <label>Zip Code</label>
            <input type='text' name="zipCode" value={billingInfo.zipCode} onChange={handleInputChange} />
          </div>
          <div className='input-group'>
            <label>Phone</label>
            <input type='text' name="phone" value={billingInfo.phone} onChange={handleInputChange} />
          </div>
        </div>

        <div className='billingInformation'>
          <h2>Credit Card Information</h2>
          <div className='input-group'>
            <label>Credit Card Number</label>
            <input type='text' name="creditCardNumber" value={billingInfo.creditCardNumber} onChange={handleInputChange} />
          </div>

          <div className='input-group input-group-select'>
            <label>Expiration Mo/Yr</label>
            <div className="select-container">
              <select name="expMonth" className="exp-month" value={billingInfo.expMonth} onChange={handleInputChange}>
                <option value="" disabled>Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1 < 10 ? `0${i + 1}` : i + 1}
                  </option>
                ))}
              </select>
              <select name="expYear" className="exp-year" value={billingInfo.expYear} onChange={handleInputChange}>
                <option value="" disabled>Year</option>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() + i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className='input-group input-group-zipcode'>
            <label>Security Code</label>
            <input type='text' name="securityCode" value={billingInfo.securityCode} onChange={handleInputChange} />
          </div>

          <div className='input-group'>
            <h3>Please read <Link to="/" style={{color:'#ccc' }}>Terms and Conditions</Link></h3>
            <div style={{display: 'flex' , justifyContent: 'space-between' , alignItems: 'center'}}>
              <h3>I have read terms and conditions </h3>
              <input type="checkbox" className='checkboxCreditCard' checked={billingInfo.termsAccepted} onChange={handleCheckboxChange} />
            </div>
          </div>

          <button className='submitcardbtn' onClick={handleSubmit} style={{cursor:'pointer'}}>Submit</button>
          <img src={Cards} className='cardaimg' alt="Accepted cards" />
        </div>
      </div>
    </div>
  );
}

export default MembershipCheckout;
