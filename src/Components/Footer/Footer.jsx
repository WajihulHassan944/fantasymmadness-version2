import React from 'react';
import Logo from "../../Assets/logo.png";
import { Link } from 'react-router-dom';
import "./Footer.css";

const Footer = () => {
  return (
    <footer class="footer-distributed">

    <div class="footer-left">

    <img src={Logo} alt="Logo" style={{width:'70px'}} />
     

      <p class="footer-links">
      <Link to="/" className="footerlink">Home</Link>
       
        <Link to="/privacy-policy" className="footerlink">Privacy policy</Link>
        <Link to="/terms-of-service" className="footerlink">Terms of service</Link>
        <Link to="/contact" className="footerlink">Contact</Link>
       
       </p>

      <p class="footer-company-name">Fantasy Mmadness © 2024</p>
    </div>

    <div class="footer-center">

      <div>
        <i class="fa fa-map-marker"></i>
        <p><span>2350 Beaver Ruin Rd,</span> Norcross Georgia 30071</p>
      </div>

      <div>
        <i class="fa fa-phone"></i>
        <p>+1.555.555.5555</p>
      </div>

      <div>
        <i class="fa fa-envelope"></i>
        <p><a href="mailto:Contact@fantasymmadness.com">Contact@fantasymmadness.com</a></p>
      </div>

    </div>

    <div class="footer-right">

      <p class="footer-company-about">
        <span>About Fantasy Mmadness LLC</span>
        Fantasy Mmadness LLC is a company dedicated to creating engaging fantasy sports experiences for fans.</p>

      <div class="footer-icons">

        <a href="https://www.facebook.com/share/2pzYV9XdQpAU7n6p/?mibextid=LQQJ4d"><i class="fa fa-facebook"></i></a>
        <a href="https://x.com/davis_kell51697"><i class="fa fa-twitter"></i></a>
        <a href="https://www.instagram.com/fantasymmadness"><i class="fa fa-instagram"></i></a>

      </div>

    </div>

  </footer>
  );
};

export default Footer;
