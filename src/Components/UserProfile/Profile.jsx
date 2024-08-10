import React from 'react'
import "./Profile.css";

import Logoimage from "../../Assets/myimg.jpg";
import backgroundImg from "../../Assets/new-bg.png"
const Profile = () => {
  return (
    <div className='myprofile'>

<div className='member-header'>
      <div className='member-header-image'>
        <img src={Logoimage} alt="Logo" />
      </div>
      <h3>Member Name - upgrade</h3>
      <h3>Current plan: None</h3>
    </div>

    <div className='fightwalletWrap'>
      <div className='fightWallet'>
      <h1 style={{textAlign:'center'}}><i className="fa fa-shopping-bag" aria-hidden="true"></i> Fight Wallet</h1>
      <h2>Tokens Remaining: <span>35</span></h2>
  </div>
</div>


      <div className='createAccount' style={{background:'transparent' , marginTop:'-100px'}}>
            <div className='registerCard'>
                <h1>Edit your profile</h1>

                <div className='input-wrap-one'>
                    <div className='input-group'>
                        <label>First Name <span>*</span></label>
                        <input type='text' />
                    </div>
                    <div className='input-group'>
                        <label>Last Name <span>*</span></label>
                        <input type='text' />
                    </div>
                </div>

                <div className='input-wrap-two'>
                    <div className='input-group'>
                        <label>User Name? <span>*</span></label>
                        <input type='text' />
                    </div>
                    <i className="fa fa-refresh" aria-hidden="true"></i>
                </div>

                <div className='input-wrap-one'>
                    <div className='input-group'>
                        <label>Your Email <span>*</span></label>
                        <input type='text' />
                    </div>
                    <div className='input-group'>
                        <label>Your Phone (Mobile) <span>*</span></label>
                        <input type='text' />
                    </div>
                </div>

                <div className='input-wrap-one'>
                    <div className='input-group'>
                        <label>Zip Code <span>*</span></label>
                        <input type='text' />
                    </div>
                </div>

                <div className='termsConditions'>
                    <h2>Your Short Bio</h2>
                    <textarea style={{width:'100%' , border:'none' , minHeight:'10vh'}}></textarea>
                    
                </div>


               
                <button type="submit" className='btn-grad' style={{width:'30%'}}>Save Settings</button>
            </div>




            <div className='divTwoProfile' >
            
                <button type="submit" className='btn-grad profile-btn' style={{width:'40%'}}>Delete My Account</button>
                <button type="submit" className='btn-grad profile-btn' style={{width:'40%'}}>Cancel My Subscription</button>
                <button type="submit" className='btn-grad profile-btn' style={{width:'40%'}}>Add tokens to Wallet</button>
               <div className='pairOfHtags'>
                <h1>Your Public player profile link:</h1>
                <h1>fantasymmadness.com/</h1>

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
  )
}

export default Profile
