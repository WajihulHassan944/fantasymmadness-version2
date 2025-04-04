import React, { useEffect, useState } from 'react'
import "./Sponsors.css";
const Sponsors = ({sponsors}) => {
    
  return (
    <div className='sponsors-wrap'>
    <img src="https://ufcfightclub.com/assets/ufc2/patterns/double_black_top_right.svg" alt="design" className='toabsolutedesign'/>
    
      <h1>OUR PARTNERS 
      <img src="https://ufcfightclub.com/assets/ufc2/patterns/brackets.svg" alt='img' /></h1>
      <h2>EXPLORE THE TIERS</h2>

<div className='sponsor-container-parent'>




{sponsors.length > 0 ? (
          sponsors.map((sponsor) => (
            <div className='sponsors-main' key={sponsor._id}>
<a href={sponsor.websiteLink} target="_blank" rel="noopener noreferrer">   <div className='sponsorItem'><img src={sponsor.image} alt="sponsor" /></div>
<h1>{sponsor.name}</h1></a>
</div>

           ))
        ) : (
          <p className="no-sponsors-message">No sponsors available at the moment.</p>
        )}

</div>  




</div>
  )
}

export default Sponsors
