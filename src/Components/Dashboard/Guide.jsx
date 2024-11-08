import React from 'react'
import "./guide.css";
import Resetpassword from "../../Assets/resetpassword.png";
import joinleague from "../../Assets/joinleague.png";
import FightPromotedByAffiliate from "../../Assets/fightpromotedbyaffiliate.png";
const Guide = () => {
  return (
    <div className='guide-wrapper'>
       <h1>Welcome To Our<br /><span>Detailed user Guides</span></h1>
     
     <div className='guides-content'>

        <div className='guide-text-center'>
            <p>
            Welcome to our comprehensive User Guides, specially crafted to help you navigate and excel in Fantasy MMADness. Whether you're new to fantasy sports or an experienced player looking to refine your strategies, our guides provide step-by-step instructions and expert tips tailored to fantasy MMA. Explore essential features, learn how to make the best picks, and discover winning strategies to enhance your experience. Our goal is to equip you with all the knowledge you need to dominate your fantasy leagues. Dive in, and let’s take your fantasy MMA journey to the next level!
            </p>
        </div>

        <div className='guide-flex-row-left'>
           
           <h2>Reset Password</h2>
           <div className='guide-flex-row-left-div'>
            <img src={Resetpassword} alt="img" />
            <p>To reset your password, please navigate to the login page and select "Forgot your password." Enter the email address associated with your account and submit the request. You will receive an email containing a secure link where you can enter and confirm a new password. Once completed, your account will be updated with the new password.</p>

             </div>
        </div>



        <div className='guide-flex-row-left'>
           
           <h2>Join Affiliate's League</h2>
           <div className='guide-flex-row-left-div'>
           <p>
        To join the Affiliate's League, sign in to your account and navigate to the "Leagues" tab. Here, you’ll find a list of available leagues you can join. Once you select a league and confirm your choice, you’ll receive an email notification with further details.
    </p>
            <img src={joinleague} alt="img" />
          
            </div>
        </div>




        <div className='guide-flex-row-left'>
           
           <h2>Clicking Affiliate Profile</h2>
           <div className='guide-flex-row-left-div'>
            <img src={FightPromotedByAffiliate} alt="img" />
            <p>
        After signing in and navigating to the "Leagues" section, you will see affiliate profile photos outlined with a gradient border. This border indicates an upcoming fight being promoted by that affiliate. Clicking on the profile will reveal the name of the fight being promoted.
    </p>

             </div>
        </div>








     </div>
    </div>
  )
}

export default Guide
