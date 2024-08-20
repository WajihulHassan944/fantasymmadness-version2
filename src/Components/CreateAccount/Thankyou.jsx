import React from 'react';
import "./Thankyou.css";
import Background from "../../Assets/thankyou.png";

const Thankyou = ({ response }) => {
  return (
    <div className='thankyou-wrapper'>
      <div className='content'>
        <h1>{response.title}</h1>
        <p>{response.message}</p>
      </div>
     
      <div className='imgwrap'>
        <img src={Background} alt="Thank you" />
      </div>
    </div>
  );
};

export default Thankyou;
