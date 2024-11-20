import React from 'react';
import Logo from "../../Assets/logo.png";
import { Link } from 'react-router-dom';
import "./Footer.css";
import Facebook from "../../Assets/facebook-removebg-preview-two.png";
import twitter from "../../Assets/twitter-removebg-preview-two.png";
import insta from "../../Assets/insta-removebg-preview-two.png";
const Footer = () => {
  return (
    <footer class="footer-distributed">

    <div class="footer-left">

    <img src={Logo} alt="Logo" style={{width:'70px'}} />
     
    <p>2350 Beaver Ruin Rd, Norcross Georgia 30071</p>
    <p><a href="mailto:Contact@fantasymmadness.com">Contact@fantasymmadness.com</a></p>

      <p class="footer-company-name">Fantasy Mmadness © 2024</p>
    </div>

    <div class="footer-center">

    <p class="footer-links">
        <Link to="/privacy-policy" className="footerlink">Privacy policy</Link>
        <Link to="/terms-of-service" className="footerlink">Terms of service</Link>
        <Link to="/contact" className="footerlink">Contact</Link>
        <Link to="/faqs" className="footerlink">Faqs</Link>
       
       </p>
 
    </div>

    <div class="footer-right">

      <p class="footer-company-about">
        <span>About Fantasy Mmadness LLC</span>
        Fantasy Mmadness LLC is a company dedicated to creating engaging fantasy sports experiences for fans.<Link to="about" style={{textDecoration:'none'}}>view more</Link></p>

      <div class="footer-icons">

        <a href="https://www.facebook.com/share/2pzYV9XdQpAU7n6p/?mibextid=LQQJ4d" style={{background:'transparent'}}><img src={Facebook} style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'50%'}} alt="SocialIcon" /></a>
        <a href="https://www.instagram.com/fantasymmadness" style={{background:'transparent'}}><img src={insta} style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'50%'}} alt="SocialIcon" /></a>
        <a href="https://x.com/davis_kell51697" style={{background:'transparent'}}><img src={twitter} style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'50%'}} alt="SocialIcon" /> </a>
      
      </div>

    </div>

  </footer>
  );
};

export default Footer;
