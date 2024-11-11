import React, { useEffect, useState } from 'react'
import "./guide.css";
import Resetpassword from "../../Assets/resetpassword.png";
import joinleague from "../../Assets/joinleague.png";
import FightPromotedByAffiliate from "../../Assets/fightpromotedbyaffiliate.png";
import RemoveFightFromDashboard from "../../Assets/removedashboard.png";
import TrashedFight from "../../Assets/trashedfight.png";
import EditPhoto from "../../Assets/editphoto.png";
import TokensRemaining from "../../Assets/tokensremaining.png";
import PostAQuestion from "../../Assets/postQuestionInCommunityForum.png";
import ReplyToThread from "../../Assets/replyToThread.png";
import RepliesOfThread from "../../Assets/repliesOfThread.png";
const Guide = () => {
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
       <h1 className='guideHeadingMain'>Welcome To Our<br /><span>Detailed user Guides</span></h1>
     
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
      <a href="#clickAffiliateProfile" onClick={(e) => handleScroll(e, 'clickAffiliateProfile')}>
        <h1>iii. Clicking Affiliate Profile</h1>
        <h2>03</h2>
      </a>
      <a href="#removeUnwantedFights" onClick={(e) => handleScroll(e, 'removeUnwantedFights')}>
        <h1>iv. Remove Unwanted Fights</h1>
        <h2>04</h2>
      </a>
      <a href="#retrieveTrashedFights" onClick={(e) => handleScroll(e, 'retrieveTrashedFights')}>
        <h1>v. Retrieve Trashed Fights</h1>
        <h2>05</h2>
      </a>
      <a href="#updateProfilePicture" onClick={(e) => handleScroll(e, 'updateProfilePicture')}>
        <h1>vi. Update Your Profile Photo</h1>
        <h2>06</h2>
      </a>
      <a href="#accountWallet" onClick={(e) => handleScroll(e, 'accountWallet')}>
        <h1>vii. Account Wallet</h1>
        <h2>07</h2>
      </a>
      <a href="#postInForum" onClick={(e) => handleScroll(e, 'postInForum')}>
        <h1>viii. Post in Community Forum</h1>
        <h2>08</h2>
      </a>
      <a href="#replyToThread" onClick={(e) => handleScroll(e, 'replyToThread')}>
        <h1>ix. Reply To Threads</h1>
        <h2>09</h2>
      </a>
      <a href="#repliesOfThread" onClick={(e) => handleScroll(e, 'repliesOfThread')}>
        <h1>x. View All Answers of Thread</h1>
        <h2>10</h2>
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




        <div className='guide-flex-row-left' id="clickAffiliateProfile">
           
           <h2>Clicking Affiliate Profile</h2>
           <div className='guide-flex-row-left-div'>
            <img src={FightPromotedByAffiliate} alt="img" />
            <p>
        After signing in and navigating to the "Leagues" section, you will see affiliate profile photos outlined with a gradient border. This border indicates an upcoming fight being promoted by that affiliate. Clicking on the profile will reveal the name of the fight being promoted.
    </p>

             </div>
        </div>



        <div className='guide-flex-row-left' id="removeUnwantedFights">
           
           <h2>Remove Unwanted Fights</h2>
           <div className='guide-flex-row-left-div'>
           <p>
        To remove a fight from your dashboard or the "Your Fights" tab, simply hover over the fight element. A "Remove from dashboard" button will appear. Clicking this button will move the fight to the "Trashed Fights" section, where you can retrieve it later if needed.
    </p>
            <img src={RemoveFightFromDashboard} alt="img" />
          
            </div>
        </div>



        <div className='guide-flex-row-left' id="retrieveTrashedFights">
           
           <h2>Retrieve Trashed Fights</h2>
           <div className='guide-flex-row-left-div'>
            <img src={TrashedFight} alt="img" />
            <p>
        To retrieve trashed fights and restore them to your dashboard, go to the "Profile" tab and click on the "My Trashed Fights" button. You will be redirected to the Trashed Fights page. Hovering over any fight element will display an option to remove it from the trash. Clicking on this option will restore the fight to your dashboard, allowing you to make predictions and take other necessary actions.
    </p>

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
           
           <h2>Account Wallet</h2>
           <div className='guide-flex-row-left-div'>
            <img src={TokensRemaining} alt="img" />
            <p>
        Your Account Wallet displays the tokens available for making predictions on fights that require tokens. Keep an eye on your balance to ensure you have enough tokens to participate in upcoming events.
    </p>

             </div>
        </div>
        



        <div className='guide-flex-row-left' id="postInForum">
           
           <h2>Post in Community Forum</h2>
           <div className='guide-flex-row-left-div'>
           <p>
        If you encounter any issues, navigate to the "Community" tab. At the top, you'll see the "Have a Question" option. Click on it, enter the title and description of your query, and submit it. The community will respond, helping you find a solution to your problem.
    </p>
           <img src={PostAQuestion} alt="img" />
          
            </div>
        </div>





        <div className='guide-flex-row-left' id="replyToThread">
           
           <h2>Reply To Threads</h2>
           <div className='guide-flex-row-left-div'>
            <img src={ReplyToThread} alt="img" />
            <p>
        To reply to a thread or question in the Community Forum, navigate to the "Community" tab, where you’ll see all posted questions. Click the "Reply" button on the thread you wish to respond to. This will open a window with the thread details. Scroll to the bottom, type your reply, and submit it.
    </p>

             </div>
        </div>



        <div className='guide-flex-row-left' id="repliesOfThread">
           
           <h2>View All Answers of Thread</h2>
           <div className='guide-flex-row-left-div'>
           <p>
        To view all answers posted by other users in a thread, navigate to the "Community" tab, where you’ll see a list of questions and threads. Simply click on the thread you wish to view, and you will be directed to the thread’s details page, which displays all replies and answers.
    </p>
           <img src={RepliesOfThread} alt="img" />
          
            </div>
        </div>



     </div>
    </div>
  )
}

export default Guide