import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux store
import Logoimage from "../../Assets/myimg.jpg";
import "./FightCosting.css";
import MakePredictions from '../MakePredictions/MakePredictions'


const FightCosting = ({ matchId }) => {
  const user = useSelector((state) => state.user);
  const matches = useSelector((state) => state.matches.data);

  const match = matches.find((m) => m._id === matchId);

  const [timeRemaining, setTimeRemaining] = useState({
    diffHrs: 0,
    diffMins: 0,
    diffSecs: 0,
    hasStarted: false,
  });
  const [showPredictions, setShowPredictions] = useState(false);

  useEffect(() => {
    if (!match) return;

    const calculateTimeRemaining = () => {
      const matchDateTime = new Date(`${match.matchDate.split('T')[0]}T${match.matchTime}`);
      const now = new Date();

      const diffMs = matchDateTime - now;

      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);

      const hasStarted = diffMs <= 0;

      setTimeRemaining({
        diffHrs: hasStarted ? 0 : diffHrs,
        diffMins: hasStarted ? 0 : diffMins,
        diffSecs: hasStarted ? 0 : diffSecs,
        hasStarted,
      });
    };

    // Calculate the initial time remaining
    calculateTimeRemaining();

    // Update the time remaining every second
    const interval = setInterval(calculateTimeRemaining, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [match]);

  if (!match) {
    return <div>Match not found</div>;
  }




  const handleMatchClick = () => {
    setShowPredictions(true);
  
  };
  
  if (showPredictions) {
    return  <MakePredictions matchId={matchId} />
  }



  return (
    <div className='fightCosting'>
      <div className='member-header'>
        <div className='member-header-image'>
          <img src={user.profileUrl || Logoimage} alt="Logo" />
        </div>
        <h3>Member Name: {user.firstName} {user.lastName}</h3>
        <h3>Current plan: None</h3>
      </div>

      <div className='fightwalletWrap'>
        <div className='fightWallet'>
          <h1><i className="fa fa-shopping-bag" aria-hidden="true"></i> Fight Wallet</h1>
          <h2>Tokens Remaining: <span>35</span></h2>
        </div>
      </div>

      <div className='fightDetailsContainer'>
        <div className='fightersImagesInFightDetails'>
          <div className='imgWrapFights'>
            <img src={match.fighterAImage} alt={match.matchFighterA} />
          </div>
          <h1>VS</h1>
          <div className='imgWrapFights'>
            <img src={match.fighterBImage} alt={match.matchFighterB} />
          </div>
        </div>
        <h1 className='fightTypeInFightDetails'>
          <span>{match.matchFighterA}</span> &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <span>{match.matchFighterB}</span>
        </h1>

        <div className='beiginningTimeFight'>
          <h1>Will Begin in - </h1>
          <p style={{ color: "#38b90c" }}>
            {timeRemaining.hasStarted
              ? "Fight has started"
              : `Begins in ${timeRemaining.diffHrs} hrs ${timeRemaining.diffMins} mins ${timeRemaining.diffSecs} secs`}
          </p>
        </div>

        <h1 className='fightTypeInFightDetails'>
          This Fight Costs <span style={{ color: 'violet' }}>{match.matchTokens} tokens</span> to play
        </h1>

        <h1 className='fightTypeInFightDetails'>
          You have <span style={{ color: '#ffc000' }}>35 tokens</span> in your wallet <i className="fa fa-circle" style={{ color: 'yellow', fontSize: '30px' }}></i>
        </h1>

        <div className='fightDetailsPot'>
          <h1>MAX :</h1>
          <p style={{ color: "#38b90c" }}>12 Rounds</p>
        </div>

        <button className='btn-grad' onClick={() => handleMatchClick()}>Play?</button>
      </div>
      <p className='note'>
        You must make predictions at least 10 minutes before the fight starts or they will not be used when the fight starts.
      </p>
    </div>
  );
};

export default FightCosting;
