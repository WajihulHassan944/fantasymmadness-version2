import React from 'react'
import "./Sponsors.css";
import SponsorOne from "../../Assets/Sponsor-1.jpg";
import SponsorTwo from "../../Assets/sponsortwo.png";
const Sponsors = () => {
  return (
    <div className='sponsors-wrap'>
    <img src="https://ufcfightclub.com/assets/ufc2/patterns/double_black_top_right.svg" alt="design" className='toabsolutedesign'/>
    
      <h1>OUR PARTNERS 
      <img src="https://ufcfightclub.com/assets/ufc2/patterns/brackets.svg" alt='img' /></h1>
      <h2>EXPLORE THE TIERS</h2>

<div className='sponsor-container-parent'>
<div className='sponsors-main'>
<a href="https://musclecitybarbell.com/" >   <div className='sponsorItem'><img src={SponsorOne} alt="sponsor" /></div></a>
</div>

<div className='sponsors-main'>
<a href="https://100percentchiropractic.com/" >   <div className='sponsorItem'><img src={SponsorTwo} alt="sponsor"  /></div></a>
</div>


</div>  </div>
  )
}

export default Sponsors
