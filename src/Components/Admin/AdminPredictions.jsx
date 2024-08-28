
import React, { useState } from 'react';
import "./AdminPredictions.css";
import { useSelector } from 'react-redux';

const AdminPredictions = ({ matchId }) => {
  const [showRWPopup, setShowRWPopup] = useState(false);
  const [showKOPopup, setShowKOPopup] = useState(false);
  const [selectedRWValue, setSelectedRWValue] = useState(null);
  const [selectedKOValue, setSelectedKOValue] = useState(null);
  
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

  // Compute Fighter 2's RL and SP based on Fighter 1's stats
  const computeFighterTwoStats = () => {
    return {
      ...fighterTwoStats,
      RL: fighterOneStats.RW === 100 ? 25 : 100,
      SP: fighterOneStats.KO === 500 ? 25 : 500,
      RW: fighterOneStats.RW === 100 ? 25 : 100,
      KO: fighterOneStats.KO === 500 ? 25 : 500,
    };
  };

  const handleRWSelect = (value) => {
    setSelectedRWValue(value);
    setFighterOneStats((prevStats) => {
      const newStats = { ...prevStats, RW: value };
      newStats.RL = value === 100 ? 25 : 100;
      return newStats;
    });
    setShowRWPopup(false);
  };

  const handleKOSelect = (value) => {
    setSelectedKOValue(value);
    setFighterOneStats((prevStats) => {
      const newStats = { ...prevStats, KO: value };
      newStats.SP = value === 500 ? 25 : 500;
      return newStats;
    });
    setShowKOPopup(false);
  };
  const Popup = ({ isVisible, onClose, onSelect, stat }) => {
    if (!isVisible) return null;
  
    return (
      <div className="popup">
        <h3>Select value for {stat}</h3>
        {stat === 'RW' && (
          <>
            <button onClick={() => { onSelect(100); onClose(); }}>100</button>
            <button onClick={() => { onSelect(25); onClose(); }}>25</button>
          </>
        )}
        {stat === 'KO' && (
          <>
            <button onClick={() => { onSelect(500); onClose(); }}>500</button>
            <button onClick={() => { onSelect(25); onClose(); }}>25</button>
          </>
        )}
      </div>
    );
  };
  

  const handleButtonClick = (fighter, stat) => {
    if (stat === 'RW') {
      setShowRWPopup(true);
      return;
    }
    if (stat === 'KO') {
      setShowKOPopup(true);
      return;
    }

    // Existing functionality for other stats
    const updateStats = (stats, stat) => {
      const newStats = { ...stats, [stat]: stats[stat] + 1 };
      if (stat === 'HP' || stat === 'BP') {
        newStats.TP = newStats.HP + newStats.BP;
      }
      if (stat === 'SP') {
        newStats.KO = 25;
        newStats.SP = 500;
      }
      return newStats;
    };

    if (fighter === 'one') {
      setFighterOneStats((prevStats) => updateStats(prevStats, stat));
    } else if (fighter === 'two') {
      setFighterTwoStats((prevStats) => updateStats(prevStats, stat));
    }
  };

  const handleSave = async () => {
    const payload = {
      fighterOneStats: { ...fighterOneStats, roundNumber: round },
      fighterTwoStats: { ...computeFighterTwoStats(), roundNumber: round },
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
        setFighterOneStats({
          HP: 0,
          BP: 0,
          TP: 0,
          RW: 0,
          RL: 0,
          KO: 0,
          SP: 0,
        });
        setFighterTwoStats({
          HP: 0,
          BP: 0,
          TP: 0,
          RW: 0,
          RL: 0,
          KO: 0,
          SP: 0,
        });
        if (round < 12) setRound(round + 1);
      } else {
        console.error('Error saving round results:', result.message);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleFinishFight = async () => {
    try {
      const response = await fetch(`https://fantasymmadness-game-server-three.vercel.app/finishMatch/${matchId}`, {
        method: 'POST',
      });

      const result = await response.json();
      if (response.ok) {
        alert('The match has been finished.');
        console.log('Match status updated to Finished:', result.match);
        window.location.reload();
      } else {
        console.error('Error finishing match:', result.message);
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
        <h2>{match.matchFighterA} -VS- {match.matchFighterB} <span className='toRemove'>- Round {round}</span></h2>

        <button className='btn-grad finishFight' onClick={handleFinishFight}>Finish Fight</button>
      </div>

      <div className='actualPredictionsWrapper'>
        <Popup
          isVisible={showRWPopup}
          onClose={() => setShowRWPopup(false)}
          onSelect={handleRWSelect}
          stat="RW"
        />
        <Popup
          isVisible={showKOPopup}
          onClose={() => setShowKOPopup(false)}
          onSelect={handleKOSelect}
          stat="KO"
        />
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
            {['HP', 'BP', 'TP', 'RL', 'SP'].map((stat, index) => (
              <div key={index} className='buttonBoxWrapp'>
                <div
                  className={`ButtonBoxAdmin makeBackgroundRed`}
                  onClick={() => handleButtonClick('two', stat)}
                >
                  <h1>{stat}</h1>
                </div>
                <h1 className='outputBox'>{stat === 'RL' ? computeFighterTwoStats().RL : stat === 'SP' ? computeFighterTwoStats().SP : fighterTwoStats[stat]}</h1>
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