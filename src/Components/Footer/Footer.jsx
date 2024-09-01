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

      
      

      <div className="socialIcons">
      <a href="https://www.facebook.com/fantasymmadness" 
         target="_blank" 
         rel="noopener noreferrer" 
         className="iconWrap">
        <i className="fa fa-facebook"></i>
      </a>
      <a href="https://x.com/davis_kell51697" 
         target="_blank" 
         rel="noopener noreferrer" 
         className="iconWrap">
        <i className="fa fa-twitter"></i>
      </a>
      <a href="https://www.instagram.com/fantasymmadness" 
         target="_blank" 
         rel="noopener noreferrer" 
         className="iconWrap">
        <i className="fa fa-instagram"></i>
      </a>
      <a href="https://www.linkedin.com/company/fantasymmadness" 
         target="_blank" 
         rel="noopener noreferrer" 
         className="iconWrap">
        <i className="fa fa-linkedin-square" aria-hidden="true"></i>
      </a>
    </div>
<div class="footerLastDiv">
    <p><span>Fantasy Mmadness</span>
   <span style={{fontStyle:'normal', color:'#fff'}}> © </span>2024
    </p>
    <Link to="/privacy-policy" class="footerlink">Privacy policy</Link>
    <Link to="/terms-of-service" class="footerlink">Terms of service</Link>
      
</div>
      




    </div>
  )
}

export default Footer
