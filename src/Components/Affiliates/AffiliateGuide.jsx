import React, { useEffect, useState } from 'react'
import Resetpassword from "../../Assets/resetpassword.png";
import EditPhoto from "../../Assets/editphoto.png";
import Balance from "../../Assets/balance.png";
import BackArrow from "../../Assets/backarrow.png";
import MemberName from "../../Assets/membername.png";
import AffiliateCriteria from "../../Assets/promotionaffiliatecriteria.png";
import FightDetailsPage from "../../Assets/fightdetailsaffiliate.png";
import PreferredPaymentMethod from "../../Assets/prefferedpayment.png";
import ProfileContent from "../../Assets/profilecontent.png";
import PromotionalImage from "../../Assets/promotional-image (4).png";
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
      <a href="#updateProfilePicture" onClick={(e) => handleScroll(e, 'updateProfilePicture')}>
        <h1>ii. Update Your Profile Photo</h1>
        <h2>02</h2>
      </a>
      <a href="#AffiliateCriteria" onClick={(e) => handleScroll(e, 'AffiliateCriteria')}>
        <h1>iii. Affiliate Criteria for Shadow Fights</h1>
        <h2>03</h2>
      </a>
    
      <a href="#accountWallet" onClick={(e) => handleScroll(e, 'accountWallet')}>
        <h1>iv. Account Balance</h1>
        <h2>04</h2>
      </a>
      <a href="#FightDetailsPage" onClick={(e) => handleScroll(e, 'FightDetailsPage')}>
        <h1>v. Fight Details</h1>
        <h2>05</h2>
      </a>
      <a href="#MemberName" onClick={(e) => handleScroll(e, 'MemberName')}>
        <h1>vi. Member Name on Header</h1>
        <h2>06</h2>
      </a>
      <a href="#BackArrow" onClick={(e) => handleScroll(e, 'BackArrow')}>
        <h1>vii. Back Arrow across components</h1>
        <h2>07</h2>
      </a>

   <a href="#ProfileContent" onClick={(e) => handleScroll(e, 'ProfileContent')}>
        <h1>viii. Update Profile Info</h1>
        <h2>08</h2>
      </a>
      <a href="#PreferredPaymentMethod" onClick={(e) => handleScroll(e, 'PreferredPaymentMethod')}>
        <h1>ix. Preferred Payment Method</h1>
        <h2>09</h2>
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


        <div className='guide-flex-row-left' id="updateProfilePicture">
           
           <h2>Update Your Profile Photo</h2>
           <div className='guide-flex-row-left-div'>
           <p>
        To update your account's profile photo, go to the "Profile" tab, where your current profile photo is displayed at the top. Click on the "Choose File" button to select your new photo, then scroll to the bottom and click "Save Settings." Your profile picture will be updated successfully.
    </p>
            <img src={EditPhoto} alt="img" />
          
            </div>
        </div>



        <div className='guide-flex-row-left' id="accountWallet">
           
           <h2>Account Balance</h2>
           <div className='guide-flex-row-left-div'>
            <img src={Balance} alt="img" />
            <p>
        Your account balance reflects the profit earned from your promoted fights. You can request a payout at any time to withdraw your balance. To view your balance, navigate to the "Profile" tab, where it will be displayed at the top of the header.
    </p>

             </div>
        </div>



        <div className='guide-flex-row-left' id="FightDetailsPage">
           
           <h2>Fight Details</h2>
   <div className='guide-flex-row-left-div'>
   <p>
        Clicking on any promoted fight element under the dashboard's "Your Promotion Fights" section will direct you to the Fight Details component. This page displays all the relevant fight details, including options to delete the promotion, view the fight's dashboard, download the promotional banner for social media, access the promotional link, and record a podcast.
    </p>
       <img src={FightDetailsPage} alt="Fight Details Page Guide" />
   </div>
           </div>


           <div className='guide-flex-row-left' id="AffiliateCriteria">
           <h2>Affiliate Criteria for Shadow Fights</h2>
<div className='guide-flex-row-left-div'>
    <img src={AffiliateCriteria} alt="Affiliate Criteria for Shadow Fights Guide" />
    <p>
        The affiliate criteria for shadow fights require a minimum number of players to meet the promotion's budget. For example, if you set the pot winner/award amount to 200 tokens and the player buy-in tokens to 10, you will need 20 players to start the fight. If the budget is not met by the fight's start time, the fight will not proceed. 

        The system provides real-time updates while you are creating a promotion, helping you ensure the criteria are met.
    </p>
</div>

        </div>




        <div className='guide-flex-row-left' id="MemberName">
           
        <h2>Member Name on Header</h2>
<div className='guide-flex-row-left-div'>
    <p>
        After logging in, your dashboard header displays your username across all components, indicating the logged-in user.
    </p>
    <img src={MemberName} alt="Member Name on Header Guide" />
   
</div>
 </div>




 <div className='guide-flex-row-left' id="BackArrow">
           
           <h2>Back Arrow across components</h2>
           <div className='guide-flex-row-left-div'>
            <img src={BackArrow} alt="img" />
            <p>
        A back arrow is available across all dashboard components, located in the top left corner. This allows you to easily navigate back to previous screens for a smoother user experience.
    </p>

             </div>
        </div>


        <div className='guide-flex-row-left' id="PreferredPaymentMethod">
           
           <h2>Preferred Payment Method</h2>
<div className='guide-flex-row-left-div'>
    <p>
        You can set your preferred payment method, which will be visible to the admin. This is helpful if you wish to withdraw your account balance to a monetary amount.
    </p>
    <img src={PreferredPaymentMethod} alt="Preferred Payment Method Guide" />
</div>
  </div>
   


  <div className='guide-flex-row-left' id="ProfileContent">
              
              <h2>Update Profile Info</h2>
   <div className='guide-flex-row-left-div'>
       <img src={ProfileContent} alt="Update Profile Info Guide" />
       <p>
           You can update your account information by navigating to the Profile tab. On the left, you’ll see input fields with your current information. Click on any field to update the respective record, then scroll to the bottom and click "Save Settings." Please note that your email cannot be changed.
       </p>
   </div>
   </div>





   <div className='guide-flex-row-left' id="PreferredPaymentMethod">
   <h2>Promotional Image</h2>
<div className='guide-flex-row-left-div'>
    <p>
        To download the promotional image, click on any promoted fight to open its Fight Details page. Scroll down to find the promotional banner image and click the "Download" button. You can share this image on your social media platforms. The image includes a QR code that users can scan to view your promotion and join your league.
    </p>
    <img src={PromotionalImage} alt="Promotional Image Guide" />
</div>

  </div>


     </div>
    </div>
  )
}

export default AffiliateGuide
