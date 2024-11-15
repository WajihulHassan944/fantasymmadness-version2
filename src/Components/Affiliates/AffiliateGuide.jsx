import React, { useEffect, useState } from 'react'
import Resetpassword from "../../Assets/resetpassword.png";
import joinleague from "../../Assets/joinleague.png";

const AffiliateGuide = () => {
    const [showArrowUp, setShowArrowUp] = useState(false);
   
   
  useEffect(() => {
    const handleScrollUp = () => {
      if (window.scrollY > window.innerHeight * 0.3) {
        setShowArrowUp(true);
      } else {
        setShowArrowUp(false);
      }
    };

    window.addEventListener('scroll', handleScrollUp);

    return () => window.removeEventListener('scroll', handleScrollUp);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


    const handleScroll = (e, targetId) => {
        e.preventDefault();
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth', block: 'center' });
      };
      

  return (
    <div className='guide-wrapper'>
   
   {showArrowUp && (
        <div className="arrowUp" onClick={scrollToTop}>
          <i className="fa fa-arrow-up"></i>
        </div>
      )}
       <h1 className='guideHeadingMain'>Welcome To Our<br /><span>Affiliate Guides</span></h1>
     
     <div className='guides-content'>

        <div className='guide-text-center'>
            <p>
            Welcome to our comprehensive User Guides, specially crafted to help you navigate and excel in Fantasy MMADness. Whether you're new to fantasy sports or an experienced player looking to refine your strategies, our guides provide step-by-step instructions and expert tips tailored to fantasy MMA. Explore essential features, learn how to make the best picks, and discover winning strategies to enhance your experience. Our goal is to equip you with all the knowledge you need to dominate your fantasy leagues. Dive in, and let’s take your fantasy MMA journey to the next level!
            </p>
        </div>

<center>        <div className="tableOfContents">
      <h1 className="contentTitle">Table Of Contents</h1>
      <a href="#resetPassword" onClick={(e) => handleScroll(e, 'resetPassword')}>
        <h1>i. Reset Password</h1>
        <h2>01</h2>
      </a>
      <a href="#joinAffiliateLeague" onClick={(e) => handleScroll(e, 'joinAffiliateLeague')}>
        <h1>ii. Join Affiliate's League</h1>
        <h2>02</h2>
      </a>
      </div>
</center>


        <div className='guide-flex-row-left' id="resetPassword">
           
           <h2>Reset Password</h2>
           <div className='guide-flex-row-left-div'>
            <img src={Resetpassword} alt="img" />
            <p>To reset your password, please navigate to the login page and select "Forgot your password." Enter the email address associated with your account and submit the request. You will receive an email containing a secure link where you can enter and confirm a new password. Once completed, your account will be updated with the new password.</p>

             </div>
        </div>



        <div className='guide-flex-row-left' id="joinAffiliateLeague">
           
           <h2>Join Affiliate's League</h2>
           <div className='guide-flex-row-left-div'>
           <p>
        To join the Affiliate's League, sign in to your account and navigate to the "Leagues" tab. Here, you’ll find a list of available leagues you can join. Once you select a league and confirm your choice, you’ll receive an email notification with further details.
    </p>
            <img src={joinleague} alt="img" />
          
            </div>
        </div>



     </div>
    </div>
  )
}

export default AffiliateGuide
