import React from 'react'
import "./Thankyou.css"
import Background from "../../Assets/thankyou.png"
const Thankyou = () => {
  return (
    <div className='thankyou-wrapper'>
      <div className='content'>
        <h1>Thank you for registering with us</h1>
        <p>Please check your email to confirm your account and <br />finish your account setup!</p>
      </div>
     
     <div className='imgwrap'>
      <img src={Background} />

</div>    </div>
  )
}

export default Thankyou
