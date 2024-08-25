import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Membership.css";
import MembershipCheckout from './MembershipCheckout';

const Membership = ({ email, onPlanSelected }) => {
  const [memberName, setMemberName] = useState('');
  const [memberAvatar, setMemberAvatar] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://fantasymmadness-game-server-three.vercel.app/user/${email}`);
        if (response.ok) {
          const data = await response.json();
          const { firstName, lastName, profileUrl } = data;
          setMemberName(`${firstName} ${lastName}`);
          setMemberAvatar(profileUrl);
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [email]);

  const handleSelectPlan = async (plan) => {
    if (plan === 'free') {
      try {
        const response = await fetch(`https://fantasymmadness-game-server-three.vercel.app/user/${email}/subscribe`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan: 'Free' }),
        });

        if (response.ok) {
          alert('You have successfully subscribed to the Free membership plan.');
          navigate('/login'); 
          onPlanSelected(); // Trigger re-render in the Login component
        } else {
          console.error('Failed to subscribe to the Free membership plan');
        }
      } catch (error) {
        console.error('Error subscribing to the Free membership plan:', error);
      }
    } else if (plan === 'standard') {
      setSelectedPlan('standard');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (selectedPlan === 'standard') {
    return <MembershipCheckout email={email} name={memberName} avatar={memberAvatar} />;
  }

  return (
    <div className='membership-wrapper'>
      <div className='member-header'>
        <div className='member-header-image'>
          <img src={memberAvatar} alt="Member Avatar" />
        </div>
        <h3>Member Name: {memberName}</h3>
        <h3>Current plan: None</h3>
      </div>

      <div className='mermbership-cards'>
        <div className='cardone'>
          <h1 className='cardHeading'>Standard membership</h1>
          <div className='cardprice'>
            <div className="ribbon">
              <span>Tokens</span>
            </div>
            <p>$</p>
            <div className='cardprice-two'>
              <h1>10</h1>
              <h2>Monthly</h2>
            </div>
            <p>00</p>
          </div>

          <div className='card-features'>
            <li>Access to dashboard</li>
            <li>Tokens can accumulate</li>
            <li>Play and win prizes</li>
            <li>Share fight portfolio</li>
            <li>Get on the FMMA Leaderboard</li>
          </div>
          <button className='btn-grad' onClick={() => handleSelectPlan('standard')}>SELECT</button>
        </div>

        <div className='cardone'>
          <h1 className='cardHeading'>Free membership</h1>
          <div className='cardprice'>
            <div className="ribbon">
              <span>1 Month</span>
            </div>
            <div className='cardprice-two'>
              <h1 style={{ color: '#31da01' }}>FREE</h1>
              <h2>First Month</h2>
            </div>
          </div>

          <div className='card-features'>
            <li>Access to dashboard</li>
            <li>Play predict assigned fights</li>
            <li>Get new fight updates</li>
          </div>
          <button className='btn-grad' onClick={() => handleSelectPlan('free')}>SELECT</button>
        </div>
      </div>
    </div>
  );
};

export default Membership;
