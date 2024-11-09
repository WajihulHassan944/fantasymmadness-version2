import React from 'react'
import "./guide.css";
import Resetpassword from "../../Assets/resetpassword.png";
import joinleague from "../../Assets/joinleague.png";
import FightPromotedByAffiliate from "../../Assets/fightpromotedbyaffiliate.png";
import RemoveFightFromDashboard from "../../Assets/removedashboard.png";
import TrashedFight from "../../Assets/trashedfight.png";
import EditPhoto from "../../Assets/editphoto.png";
import TokensRemaining from "../../Assets/tokensremaining.png";
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



        <div className='guide-flex-row-left'>
           
           <h2>Remove Unwanted Fights</h2>
           <div className='guide-flex-row-left-div'>
           <p>
        To remove a fight from your dashboard or the "Your Fights" tab, simply hover over the fight element. A "Remove from dashboard" button will appear. Clicking this button will move the fight to the "Trashed Fights" section, where you can retrieve it later if needed.
    </p>
            <img src={RemoveFightFromDashboard} alt="img" />
          
            </div>
        </div>



        <div className='guide-flex-row-left'>
           
           <h2>Retrieve Trashed Fights</h2>
           <div className='guide-flex-row-left-div'>
            <img src={TrashedFight} alt="img" />
            <p>
        To retrieve trashed fights and restore them to your dashboard, go to the "Profile" tab and click on the "My Trashed Fights" button. You will be redirected to the Trashed Fights page. Hovering over any fight element will display an option to remove it from the trash. Clicking on this option will restore the fight to your dashboard, allowing you to make predictions and take other necessary actions.
    </p>

             </div>
        </div>


        <div className='guide-flex-row-left'>
           
           <h2>Update Your Profile Photo</h2>
           <div className='guide-flex-row-left-div'>
           <p>
        To update your account's profile photo, go to the "Profile" tab, where your current profile photo is displayed at the top. Click on the "Choose File" button to select your new photo, then scroll to the bottom and click "Save Settings." Your profile picture will be updated successfully.
    </p>
            <img src={EditPhoto} alt="img" />
          
            </div>
        </div>




        <div className='guide-flex-row-left'>
           
           <h2>Account Wallet</h2>
           <div className='guide-flex-row-left-div'>
            <img src={TokensRemaining} alt="img" />
            <p>
        Your Account Wallet displays the tokens available for making predictions on fights that require tokens. Keep an eye on your balance to ensure you have enough tokens to participate in upcoming events.
    </p>

             </div>
        </div>



     </div>
    </div>
  )
}

export default Guide
