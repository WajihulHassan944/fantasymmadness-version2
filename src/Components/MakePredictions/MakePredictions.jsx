import React, { useEffect, useState } from 'react';
import './MakePredictions.css';
import { useSelector } from 'react-redux';
import PunchHand from '../../Assets/hand-removebg-preview.png';
import { useNavigate } from 'react-router-dom';

const MakePredictions = ({ matchId }) => {
  
  const user = useSelector((state) => state.user);
  const matches = useSelector((state) => state.matches.data);

  const match = matches.find((m) => m._id === matchId);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const [rounds, setRounds] = useState(
    Array.from({ length: 12 }, (_, i) => ({
      round: i + 1,
      hpPrediction1: '',
      bpPrediction1: '',
      hpPrediction2: '',
      bpPrediction2: '',
      tpPrediction1: 0,
      tpPrediction2: 0,
      rwPrediction1: 0,
      rwPrediction2: 0,
      koPrediction1: 0,
      koPrediction2: 0
    }))
  );

  const [timeRemaining, setTimeRemaining] = useState({
    diffHrs: 0,
    diffMins: 0,
    diffSecs: 0,
    hasStarted: false,
  });

  const [buttonText, setButtonText] = useState('Submit Predictions');
  
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

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, [match]);

  const handlePredictionChange = (e, roundIndex, field) => {
    const { value } = e.target;
    const updatedRounds = [...rounds];
    updatedRounds[roundIndex][field] = value;

    const hpPrediction1 = parseFloat(updatedRounds[roundIndex].hpPrediction1) || 0;
    const bpPrediction1 = parseFloat(updatedRounds[roundIndex].bpPrediction1) || 0;
    const hpPrediction2 = parseFloat(updatedRounds[roundIndex].hpPrediction2) || 0;
    const bpPrediction2 = parseFloat(updatedRounds[roundIndex].bpPrediction2) || 0;

    updatedRounds[roundIndex].tpPrediction1 = hpPrediction1 + bpPrediction1;
    updatedRounds[roundIndex].tpPrediction2 = hpPrediction2 + bpPrediction2;

    setRounds(updatedRounds);
  };



  const handleButtonClick = (roundIndex, buttonType) => {
    const updatedRounds = [...rounds];
    
    if (buttonType === 'rw') {
      updatedRounds[roundIndex].rwPrediction1 = 100;
      updatedRounds[roundIndex].rwPrediction2 = 25;
      updatedRounds[roundIndex].rwBorder = '2px solid crimson';
      updatedRounds[roundIndex].rlBorder = '';
    } else if (buttonType === 'rl') {
      updatedRounds[roundIndex].rwPrediction1 = 25;
      updatedRounds[roundIndex].rwPrediction2 = 100;
      updatedRounds[roundIndex].rwBorder = '';
      updatedRounds[roundIndex].rlBorder = '2px solid crimson';
    } else if (buttonType === 'ko') {
      updatedRounds[roundIndex].koPrediction1 = 500;
      updatedRounds[roundIndex].koPrediction2 = 25;
      updatedRounds[roundIndex].koBorder = '2px solid crimson';
      updatedRounds[roundIndex].spBorder = '';
    } else if (buttonType === 'sp') {
      updatedRounds[roundIndex].koPrediction1 = 25;
      updatedRounds[roundIndex].koPrediction2 = 500;
      updatedRounds[roundIndex].koBorder = '';
      updatedRounds[roundIndex].spBorder = '2px solid crimson';
    }

    setRounds(updatedRounds);
  };

  const handleFinish = async () => {
    setButtonText('Saving!');
    try {
      // Submit the predictions
      await fetch('https://fantasymmadness-game-server-three.vercel.app/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: user._id,
          matchId: matchId,
          predictions: rounds
        }),
      });
  
      // Update prediction status to 'submitted'
      await fetch(`https://fantasymmadness-game-server-three.vercel.app/api/matches/${matchId}/updatePredictionStatus`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          predictionStatus: 'submitted'
        }),
      });
      
      window.location.reload();

    } catch (error) {
      console.error('Error saving predictions:', error);
      alert('Failed to save predictions.');
    } finally {
      setButtonText('Submit Predictions'); // Reset button text in case of error
    }
  };
  
  
  if (!match) {
    return <div>Match not found</div>;
  }


  return (
    <div className='fightCosting makePredictions'>
      <div className='member-header'>
        <div className='member-header-image'>
          <img src={user.profileUrl} alt="Logo" />
        </div>
        <h3>Member Name: {user.firstName} {user.lastName}</h3>
        <h3>Current plan: {user.currentPlan}</h3>
      </div>

      <div className='fightwalletWrap'>
        <div className='fightWallet'>
          <h1><i className="fa fa-shopping-bag" aria-hidden="true"></i> Fight Wallet</h1>
          <h2>Tokens Remaining: <span>{user.tokens}</span></h2>
        </div>
      </div>

      <div className='fightDetailsContainer'>
        <h1 className='fightTypeInFightDetails'>
          Fight type: <span>{match.matchCategory}</span> - 
          <span className='makeGreen'> {match.matchType} </span> - 
          <span>{match.matchFighterA} </span> VS <span> {match.matchFighterB} </span>
        </h1>

        <div className='beiginningTimeFight'>
          <h1>Will Begin in - </h1>
          <p style={{color:"#38b90c"}}>
            {timeRemaining.hasStarted
              ? "Fight has started"
              : `Begins in ${timeRemaining.diffHrs} hrs ${timeRemaining.diffMins} mins ${timeRemaining.diffSecs} secs`}
          </p>
        </div>

        <div className='fightersImagesInFightDetails'>
          <div className='flexColumn'>
            <div className='imgWrapFights'>
              <img src={match.fighterAImage} alt={match.matchFighterA} />
            </div>
            <h1 className='fightTypeInFightDetails'>{match.matchFighterA}</h1>
          </div>

          <h1>VS</h1>

          <div className='flexColumn'>
            <div className='imgWrapFights'>
              <img src={match.fighterBImage} style={{border:'3px solid red'}} />
            </div>
            <h1 className='fightTypeInFightDetails'>{match.matchFighterB}</h1>
          </div>
        </div>

      
<div className='roundsWrapper'>
{rounds.map((round, index) => (
    <div className='roundActual' key={index}>
        <div className='roundHeading'>
            <h1>Round {round.round}</h1>
        </div>
        <div className='roundInputWrap'>
            <div className='roundInput'>
                <div className='roundInputDivOne'>
                    <i className="fa fa-caret-left" aria-hidden="true"></i>  
                    <input
                        type='number'
                        style={{border:'2px solid #2a8adb'}}
                        value={round.hpPrediction1}
                        onChange={(e) => handlePredictionChange(e, index, 'hpPrediction1')}
                    />
                </div>
                <div className='roundinput-image'>
                    <h2>HP</h2>
                    <div className='roundInputImgWrap'>
                        <img src={PunchHand} alt="HP Icon" />
                    </div>
                </div>
                <div className='roundInputDivOne'>
                    <input
                        type='number'
                        style={{border:'2px solid #e1130c'}}
                        value={round.hpPrediction2}
                        onChange={(e) => handlePredictionChange(e, index, 'hpPrediction2')}
                    />
                    <i className="fa fa-caret-right" aria-hidden="true"></i>
                </div>
            </div>

            <div className='roundInput'>
                <div className='roundInputDivOne'>
                    <i className="fa fa-caret-left" aria-hidden="true"></i>  
                    <input
                        type='number'
                        style={{border:'2px solid #2a8adb'}}
                        value={round.bpPrediction1}
                        onChange={(e) => handlePredictionChange(e, index, 'bpPrediction1')}
                    />
                </div>
                <div className='roundinput-image'>
                    <h2>BP</h2>
                    <div className='roundInputImgWrap'>
                        <img src={PunchHand} alt="BP Icon" />
                    </div>
                </div>
                <div className='roundInputDivOne'>
                    <input
                        type='number'
                        style={{border:'2px solid #e1130c'}}
                        value={round.bpPrediction2}
                        onChange={(e) => handlePredictionChange(e, index, 'bpPrediction2')}
                    />
                    <i className="fa fa-caret-right" aria-hidden="true"></i>
                </div>
            </div>

            <div className='roundInput' style={{border:'2px dashed #ccc', borderRadius:'15px', width:'80%', padding:'5px'}}>
                <div className='roundInputDivOne'>
                    <input
                        type='number'
                        style={{border:'2px solid #2a8adb'}}
                        value={round.tpPrediction1}
                        onChange={(e) => handlePredictionChange(e, index, 'tpPrediction1')}
                    />
                </div>
                <div className='roundinput-image'>
                    <h2>TP</h2>
                    <div className='roundInputImgWrap'>
                        <img src={PunchHand} alt="TP Icon" />
                    </div>
                </div>
                <div className='roundInputDivOne'>
                    <input
                        type='number'
                        style={{border:'2px solid #e1130c'}}
                        value={round.tpPrediction2}
                        onChange={(e) => handlePredictionChange(e, index, 'tpPrediction2')}
                    />
                </div>
            </div>


            <div className='roundInput' style={{paddingLeft:'40px', paddingRight:'37px'}}>
              <div className='roundInputDivOne'>
                <input
                  type='button'
                  style={{
                    border: round.rwBorder || '2px solid #2a8adb', 
                    background:'#02fc1f', 
                    textAlign:'center', 
                    color:'#025204', 
                  }} 
                  value='RW' 
                  onClick={() => handleButtonClick(index, 'rw')}
                />
              </div>


              <div className='roundinput-image'>
                <h2 style={{marginTop:'8px'}}>- OR -</h2>
              </div>
              <div className='roundInputDivOne'>
                <input
                  type='button'
                  style={{
                    border: round.rlBorder || '2px solid #2a8adb', 
                    background:'#fff', 
                    textAlign:'center', 
                    color:'red'
                  }} 
                  value='RL' 
                  onClick={() => handleButtonClick(index, 'rl')}
                />
              </div>
            </div>

            <div className='roundInputSpecial'>
              <div className='roundInputDivOne'>
                <input
                  type='button'
                  style={{
                    border: round.koBorder || '2px solid #95a04d', 
                    background:'#000300', 
                    textAlign:'center', 
                    color:'#025204', 
                    marginBottom:'5px'
                  }} 
                  value='KO' 
                  onClick={() => handleButtonClick(index, 'ko')}
                />
              </div>
              <div className='roundInputDivOne'>
                <input
                  type='button'
                  style={{
                    border: round.spBorder || '2px solid #95a04d', 
                    background:'#fff', 
                    textAlign:'center', 
                    color:'#2e5e6f',
                  }} 
                  value='SP' 
                  onClick={() => handleButtonClick(index, 'sp')}
                />
              </div>




            </div>
        </div>
    </div>
))}


</div>



<button className='btn-grad' onClick={handleFinish}>
      {buttonText}
    </button>
      </div>
    </div>
  );
};

export default MakePredictions;
