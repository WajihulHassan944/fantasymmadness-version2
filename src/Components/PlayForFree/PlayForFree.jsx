import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlayForFree = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handlePlayNowClick = () => {
    navigate('/CreateAccount'); // Navigate to the CreateAccount component when the button is clicked
  };

  return (
    <div>
      <div className='howtoplay-wrapper'>
        <h1>PLAY For Free</h1>
        <p>
          Welcome to Fantasy-MMadness, the ultimate destination for fantasy MMA enthusiasts! 
          Whether you're a seasoned player or new to the world of fantasy sports, our "Play for Free" 
          option is perfect for you.
        </p>

        <h1>Why Play for Free?</h1>
        <p>
          Experience the Thrill: Dive into the action without any cost. Create your dream MMA lineup and 
          compete against other players for bragging rights.
          Learn the Ropes: New to fantasy sports? No problem! Our free games allow you to learn and 
          understand the rules, strategies, and excitement of fantasy MMA.
          No Financial Risk: Enjoy the full experience of Fantasy-MMadness without any financial commitment. 
          Perfect for those who want to play just for fun.
        </p>

        <h1>How to Get Started</h1>
        <p>
          Sign Up for Free: Before you can make predictions, you need to sign up for a free account. 
          It’s quick, easy, and gives you access to all our exciting features.
          Make Your Predictions: After signing up, dive straight into the action. Predict the outcomes of 
          each fight, round by round, and score points based on your accuracy.
          Track Your Progress: Watch your predictions come to life as the fights unfold. Check the leaderboard 
          to see how you rank against other players in real-time.
        </p>

        <h1>What Are You Waiting For?</h1>
        <p>
          Join the fun today and experience the excitement of Fantasy-MMadness without any cost. 
          Click the button below to start playing for free!
        </p>

        <button className='btn-grad' onClick={handlePlayNowClick}>
          Play now for free
        </button>
      </div>
    </div>
  );
};

export default PlayForFree;