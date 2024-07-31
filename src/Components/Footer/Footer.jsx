import React from 'react'
import Logo from "../../Assets/logo.png";
import { Link } from 'react-router-dom';
import "./Footer.css";
const Footer = () => {
  return (
    <div className='footer'>
      
      <div className='footerDivOne'>
        <img src={Logo} />
      </div>

      
      


<div class="socialIcons">

<div class="iconWrap"><i class="fa fa-facebook"></i></div>
<div class="iconWrap"><i class="fa fa-twitter"></i></div>
<div class="iconWrap"><i class="fa fa-instagram"></i></div>
<div class="iconWrap"><i class="fa fa-linkedin-square" aria-hidden="true"></i></div>
</div>


<div class="footerLastDiv">
    <p><span>Fantasy Mmadness</span>
    © 2024
    </p>
    <Link to="" class="footerlink">Privacy policy</Link>
      
</div>
      




    </div>
  )
}

export default Footer
