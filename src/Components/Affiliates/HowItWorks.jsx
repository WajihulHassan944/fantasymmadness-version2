import React from 'react';
import imgone from "../../Assets/Picture1.jpg";
import imgtwo from "../../Assets/Picture2.png";
import imgthree from "../../Assets/Picture3.png";
import imgfour from "../../Assets/Picture4.png";
import imgfive from "../../Assets/Picture5.png";
import { useNavigate } from 'react-router-dom';

const HowItWorks = () => {
    const imageStyle = {
        maxWidth: '50%', 
        height: 'auto', 
        display: 'block', 
        margin: '50px auto'  // Centers the images horizontally
    };
const navigate = useNavigate();
    return (
        <div>
         <i
        className="fa fa-arrow-circle-left"
        aria-hidden="true"
        onClick={() => navigate(-1)} // Go back to the previous page
        style={{ position: 'fixed', top: '100px', left: '70px', cursor: 'pointer', fontSize: '24px', color: '#007bff', zIndex: '99999' }}
      ></i>
   
            <div className='howtoplay-wrapper'>
                <h1>How it works</h1>
                <p>
                    Affiliate accounts on FantasyMMAdness.com are designed for promoters who want to host and promote shadow fights by inviting people to participate in their custom leagues. The process begins with affiliate registration, which is distinct from the general member registration. Affiliates must be approved by the site administrators before they can create or publish events. Once approved, affiliates can set up shadow fights, where they define the buy-in amount and set up prize pools, known as "POTS." Affiliates receive a unique URL for each event, which they can promote through social media, email, or other platforms. If the required budget for a fight is not met, the fight is canceled, and all tokens are returned to participants. When the fight's budget is reached, half of the profits beyond the set amount go into the affiliate's wallet. Affiliates can request payouts through services like PayPal, Venmo, or CashApp. Although they do not participate in the fights themselves, affiliates can interact with members through a chat feature during the fights, promoting engagement and creating a dynamic experience for their leagues. The system provides affiliates a robust way to host, promote, and monetize their events while engaging directly with their audience.
                </p>
                
                <h2>1. Affiliate Dashboard</h2>
                <p>
                    The affiliate dashboard is the main hub where you can manage your activities, promotions, and leagues.
                </p>
                <ul>
                    <li>Overview: The dashboard provides a summary of your current promotions, ongoing leagues, available promotions.</li>
                    <li>Navigation: You’ll have quick access to profile, set up shadow fights, and promotions.</li>
                </ul>

                {/* Image for 'How it works' section */}
                <img src={imgone} alt="How it works" style={imageStyle} />

                <h2>2. Affiliate Profile</h2>
                <p>
                    Your affiliate profile contains all your personal and professional information related to your affiliate account.
                </p>
                <ul>
                    <li>Editing Profile: You can update your bio, contact information, and payment preferences (PayPal, Venmo, or CashApp) through the "Profile" section.</li>
                    <li>Profile Visibility: Other members of FantasyMMA Madness will see your profile when you promote events.</li>
                    <li>Payout Balance: Your profile also includes a balance from earnings from successful fight promotions.</li>
                </ul>

                {/* Image for 'Affiliate Dashboard' section */}
                <img src={imgtwo} alt="Affiliate Dashboard" style={imageStyle} />

                <h2>3. Affiliate Leagues</h2>
                <p>As an affiliate, you can promote leagues to attract participants.</p>
<p>Click on "Users joined league" on the dashboard, you will be able to see list of league members</p>
                {/* Image for 'Affiliate Profile' section */}
                <img src={imgthree} alt="Affiliate Profile" style={imageStyle} />

                <h2>4. Affiliate Promoted Fight Details</h2>
                <p>Affiliates are responsible for managing and promoting individual shadow fights within their leagues.</p>
                <ul>
                    <li>Event Promotion: For each fight, you will receive a unique URL that you can share on social media, email, or other platforms. Use this URL to drive participants to your events.</li>
                </ul>

                {/* Image for 'Affiliate Leagues' section */}
                <img src={imgfour} alt="Affiliate Leagues" style={imageStyle} />

                <h2>5. Affiliate Create Promotion</h2>
                <p>
                    Creating a promotion is one of the most crucial tasks for an affiliate. Promotions help attract participants to your shadow fights and increase the overall engagement of your leagues.
                </p>
            <ul>    <li>Event Setup: You can define key details for each fight, such as the buy-in amount and the target budget. The system will tell you the minimum users required to make that fight happen.</li>
                    <li>Cancelations: If the budget for a fight is not met by the deadline, the fight will be canceled. You can view all budget progress from the fight management page on your dashboard.</li>
</ul>
                {/* Image for 'Affiliate Promoted Fight Details' section */}
                <img src={imgfive} alt="Affiliate Promoted Fight Details" style={imageStyle} />
            </div>
        </div>
    );
};

export default HowItWorks;
