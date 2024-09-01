import React from 'react';
import "../CreateAccount/Thankyou.css";
import Background from "../../Assets/thankyou.png";

const AffiliateThankyou = ({response}) => {
    return (
        <div className='thankyou-wrapper'>
          <div className='content'>
            <h1>Thank you for registering with us!</h1>
            <p>An administration will review your affiliate application shortly</p>
            <p style={{color:'greenyellow', marginTop:'10px'}}>When you get your confirmation email please read the directions on how to participate</p>
          </div>
         
          <div className='imgwrap'>
            <img src={Background} alt="Thank you" />
          </div>
        </div>
      );
    };
    

export default AffiliateThankyou
