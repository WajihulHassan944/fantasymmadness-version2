import React from 'react';
import "./MembershipCheckout.css";
import Logoimage from "../../Assets/myimg.jpg";
import { Link } from 'react-router-dom';
import Cards from "../../Assets/visa-mastercard-amex_0.png"
const MembershipCheckout = () => {
  return (
    <div className='membership-chackout-wrapper'>
      <div className='member-header'>
        <div className='member-header-image'>
          <img src={Logoimage} alt="Logo" />
        </div>
        <h3>Member Name - upgrade</h3>
        <h3>Current plan: None</h3>
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
          <button className='btn-grad'>SELECT</button>
          <h2 className='cardCoupon'>Coupon Applied <br /><br /> 10 Free Tokens <br /> 50% Off First Month <br /> Total: $5.00</h2>
        </div>

        <div className='billingInformation'>
          <h2>Billing Information</h2>
          <div className='input-group'>
            <label>First Name</label>
            <input type='text' />
          </div>
          <div className='input-group'>
            <label>Last Name</label>
            <input type='text' />
          </div>
          <div className='input-group'>
            <label>Address</label>
            <input type='text' />
          </div>
          <div className='input-group'>
            <label>City</label>
            <input type='text' />
          </div>
          <div className='input-group input-group-state'>
            <label>State</label>
            <input type='text' />
          </div>
          <div className='input-group input-group-zipcode'>
            <label>Zip Code</label>
            <input type='text' />
          </div>
          <div className='input-group'>
            <label>Phone</label>
            <input type='text' />
          </div>
          <div className='input-group'>
            <label>Coupon Code?</label>
            <input type='text' />
          </div>
          <button className='subcardbtnone'>- Apply Coupon -</button>
        </div>

        <div className='billingInformation'>
          <h2>Credit Card Information</h2>
          <div className='input-group'>
            <label>Credit Card Number</label>
            <input type='text' />
          </div>

          <div className='input-group input-group-select'>
            <label>Expiration Mo/Yr</label>
            <div className="select-container">
              <select name="expMonth" className="exp-month">
                <option value="" disabled selected>Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1 < 10 ? `0${i + 1}` : i + 1}
                  </option>
                ))}
              </select>
              <select name="expYear" className="exp-year">
                <option value="" disabled selected>Year</option>
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
            <input type='text' />
          </div>

          <div className='input-group'>
            <h3>Please read <Link to="/" style={{color:'#ccc' }}>Terms and Conditions</Link></h3>
            <div style={{display: 'flex' , justifyContent: 'space-between' , alignItems: 'center'}}>
            <h3>I have read terms and conditions </h3>
            <input type="checkbox" className='checkboxCreditCard' />
          </div></div>

          <button className='submitcardbtn'>Submit</button>

          <img src={Cards}  className='cardaimg' />
        </div>
      </div>
    </div>
  );
}

export default MembershipCheckout;
