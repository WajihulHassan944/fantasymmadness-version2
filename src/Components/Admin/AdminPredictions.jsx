import React, { useState } from 'react';
import "./AdminPredictions.css";
import { useSelector } from 'react-redux';

const AdminPredictions = ({ matchId }) => {
  const matches = useSelector((state) => state.matches.data);
  const match = matches.find((m) => m._id === matchId);
  
  const [round, setRound] = useState(1); // Start with round 1
  const [fighterOneStats, setFighterOneStats] = useState({
    HP: 0,
    BP: 0,
    TP: 0,
    RW: 0,
    RL: 0,
    KO: 0,
    SP: 0,
  });
  const [fighterTwoStats, setFighterTwoStats] = useState({
    HP: 0,
    BP: 0,
    TP: 0,
    RW: 0,
    RL: 0,
    KO: 0,
    SP: 0,
  });

  const handleButtonClick = (fighter, stat) => {
    if (fighter === 'one') {
      setFighterOneStats((prevStats) => {
        const newStats = { ...prevStats, [stat]: prevStats[stat] + 1 };
        if (stat === 'HP' || stat === 'BP') {
          newStats.TP = newStats.HP + newStats.BP;
        }
        if (stat === 'RW') {
          newStats.RL = 25;
          newStats.RW = 100;
        } else if (stat === 'RL') {
          newStats.RW = 25;
          newStats.RL = 100;
        } else if (stat === 'KO') {
          newStats.SP = 25;
          newStats.KO = 100;
        } else if (stat === 'SP') {
          newStats.KO = 25;
          newStats.SP = 100;
        }
        return newStats;
      });
    } else if (fighter === 'two') {
      setFighterTwoStats((prevStats) => {
        const newStats = { ...prevStats, [stat]: prevStats[stat] + 1 };
        if (stat === 'HP' || stat === 'BP') {
          newStats.TP = newStats.HP + newStats.BP;
        }
        if (stat === 'RW') {
          newStats.RL = 25;
          newStats.RW = 100;
        } else if (stat === 'RL') {
          newStats.RW = 25;
          newStats.RL = 100;
        } else if (stat === 'KO') {
          newStats.SP = 25;
          newStats.KO = 100;
        } else if (stat === 'SP') {
          newStats.KO = 25;
          newStats.SP = 100;
        }
        return newStats;
      });
    }
  };

  const handleSave = async () => {
    const payload = {
      fighterOneStats: { ...fighterOneStats, roundNumber: round },
      fighterTwoStats: { ...fighterTwoStats, roundNumber: round },
    };
    console.log(payload);

    try {
      const response = await fetch(`https://fantasymmadness-game-server-three.vercel.app/match/addRoundResults/${matchId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
         alert(`Your prediction for Round ${round} has been submitted.`);
        // After saving, allow navigation to the next round
        if (round < 12) setRound(round + 1);
      } else {
        console.error('Error saving round results:', result.message);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className='adminPredictions'>
      <h1>{match.matchType} &nbsp; &nbsp; &nbsp;{match.matchName} &nbsp; - &nbsp; {match.matchCategory} &nbsp;&nbsp;&nbsp; Round {round}</h1>
      <div className='adminPredictionsHeader'>
        <div className='imagesWrapperAdminPredictions'>
          <div className='imgToWrap'><img src={match.fighterAImage} alt="Fighter A" /></div>
          <div className='imgToWrap'><img src={match.fighterBImage} alt="Fighter B" /></div>
        </div>
        <h2>{match.matchFighterA} -VS- {match.matchFighterB} - Round {round}</h2>
      </div>

      <div className='actualPredictionsWrapper'>
        <div className='actualAdminPredictions'>
          <h1 className='subHeading2'>{match.matchFighterA}</h1>
          <div className='adminPredictionsButtonsWrapper'>
            {['HP', 'BP', 'TP', 'RW', 'KO'].map((stat, index) => (
              <div key={index} className='buttonBoxWrapp'>
                <div
                  className={`ButtonBoxAdmin makeBackgroundBlue`}
                  onClick={() => handleButtonClick('one', stat)}
                >
                  <h1>{stat}</h1>
                </div>
                <h1 className='outputBox'>{fighterOneStats[stat]}</h1>
              </div>
            ))}
          </div>
        </div>

        <div className='actualAdminPredictions'>
          <h1 className='subHeading2'>{match.matchFighterB}</h1>
          <div className='adminPredictionsButtonsWrapper'>
            {['HP', 'BP', 'TP', 'RW', 'KO'].map((stat, index) => (
              <div key={index} className='buttonBoxWrapp'>
                <div
                  className={`ButtonBoxAdmin makeBackgroundRed`}
                  onClick={() => handleButtonClick('two', stat)}
                >
                  <h1>{stat}</h1>
                </div>
                <h1 className='outputBox'>{fighterTwoStats[stat]}</h1>
              </div>
            ))}
          </div>
        </div>

        <div className='buttonPrevNextWrap'>
          <button
            className='btn-grad'
            onClick={() => setRound((prevRound) => Math.max(prevRound - 1, 1))}
            disabled={round === 1}
          >
            Prev
          </button>
          <button
            className='btn-grad'
            onClick={() => setRound((prevRound) => Math.min(prevRound + 1, 12))}
            disabled={round === 12}
          >
            Next
          </button>
          <button className='btn-grad' onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPredictions;
