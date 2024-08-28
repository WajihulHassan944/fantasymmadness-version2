import React, { useEffect, useState } from 'react';
import FighterOne from "../../Assets/fighterOne.png";
import "./FinishedFightUserBoard.css";
import { useSelector } from 'react-redux';
import { getWinnerDetails } from '../../CustomFunctions/winnerUtils';

const FinishedFightUserBoard = ({ matchId }) => {
    const [scores, setScores] = useState([]);
    const [scoresHigh, setScoresHigh] = useState([]);
    const [users, setUsers] = useState([]);
    const [winner, setWinner] = useState({
        firstName: '',
        lastName: '',
        profileUrl: '',
        totalPoints: 0,
        matchId: '' // Initialize matchId in the state
    });
    
    const user = useSelector((state) => state.user);
    const matches = useSelector((state) => state.matches.data);
    const match = matches.find((m) => m._id === matchId);
    let totalPoints = 0;

    useEffect(() => {
        fetch('https://fantasymmadness-game-server-three.vercel.app/api/scores')
        .then(response => response.json())
        .then(data => {
          const userScores = data.filter(score => score.matchId === matchId && score.playerId === user._id);
          setScores(userScores);
      
          const highScores = data.filter(score => score.matchId === matchId);
          setScoresHigh(highScores);
        })
        .catch(error => console.error('Error fetching scores:', error));

        fetch('https://fantasymmadness-game-server-three.vercel.app/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, [matchId, user._id]);

    useEffect(() => {
        const fetchWinnerDetails = async () => {
            const winnerDetails = await getWinnerDetails(matchId);
            if (winnerDetails) {
                setWinner(winnerDetails);
            }
        };

        fetchWinnerDetails();
    }, [matchId]);



const calculateRoundPoints = (roundPrediction, fighterOneRound, fighterTwoRound) => {
        if (!fighterOneRound || !fighterTwoRound || !roundPrediction) {
            console.error('Fighter round data is missing in calculateRoundPoints', fighterOneRound, fighterTwoRound);
            return 0;
        }
    
        let roundPoints = 0;
    
        // Helper function to add points based on prediction and fighter stats
        const addPoints = (prediction, stat, points) => {
            if (prediction !== null && prediction <= stat) {
                roundPoints += points;
            }
        };
    
        // Check and calculate points for fighter one
        addPoints(roundPrediction.hpPrediction1, fighterOneRound.HP, roundPrediction.hpPrediction1);
        addPoints(roundPrediction.bpPrediction1, fighterOneRound.BP, roundPrediction.bpPrediction1);
        addPoints(roundPrediction.tpPrediction1, fighterOneRound.TP, roundPrediction.tpPrediction1);
        if (roundPrediction.rwPrediction1 !== null && roundPrediction.rwPrediction1 === fighterOneRound.RW) {
            roundPoints += roundPrediction.rwPrediction1;
        }
        if (roundPrediction.koPrediction1 !== null) {
            roundPoints += roundPrediction.koPrediction1 === fighterOneRound.KO ? fighterOneRound.KO : 0;
        }
    
        // Check and calculate points for fighter two
        addPoints(roundPrediction.hpPrediction2, fighterTwoRound.HP, roundPrediction.hpPrediction2);
        addPoints(roundPrediction.bpPrediction2, fighterTwoRound.BP, roundPrediction.bpPrediction2);
        addPoints(roundPrediction.tpPrediction2, fighterTwoRound.TP, roundPrediction.tpPrediction2);
        if (roundPrediction.rwPrediction2 !== null && roundPrediction.rwPrediction2 === fighterTwoRound.RW) {
            roundPoints += roundPrediction.rwPrediction2;
        }
        if (roundPrediction.koPrediction2 !== null) {
            roundPoints += roundPrediction.koPrediction2 === fighterTwoRound.KO ? fighterTwoRound.KO : 0;
        }
    
        return roundPoints;
    };
    

    


  const calculatePoints = (userPrediction, fighterOneStats, fighterTwoStats) => {
    let totalScore = 0;
  
    userPrediction.forEach((roundPrediction, index) => {
      const fighterOneRound = fighterOneStats[index];
      const fighterTwoRound = fighterTwoStats[index];
  
      if (!fighterOneRound || !fighterTwoRound || !roundPrediction) return;
  
      // Head Punches (HP) - Fighter One
      if (roundPrediction.hpPrediction1 !== null && roundPrediction.hpPrediction1 <= fighterOneRound.HP) {
        totalScore += roundPrediction.hpPrediction1;
      }
  
      // Body Punches (BP) - Fighter One
      if (roundPrediction.bpPrediction1 !== null && roundPrediction.bpPrediction1 <= fighterOneRound.BP) {
        totalScore += roundPrediction.bpPrediction1;
      }
  
      // Total Punches (TP) - Fighter One
      if (roundPrediction.tpPrediction1 !== null && roundPrediction.tpPrediction1 <= fighterOneRound.TP) {
        totalScore += roundPrediction.tpPrediction1;
      }
  
      // Picking Round Winner (RW) - Fighter One
      if (roundPrediction.rwPrediction1 !== null && roundPrediction.rwPrediction1 === fighterOneRound.RW) {
        totalScore += roundPrediction.rwPrediction1;
      }
  
      // Knock Out (KO) - Fighter One
      if (roundPrediction.koPrediction1 !== null) {
        if (roundPrediction.koPrediction1 === fighterOneRound.KO) {
          totalScore += fighterOneRound.KO;
        } else {
          totalScore += 0; // 25 points for wrong KO pick
        }
      }
  
      // Head Punches (HP) - Fighter Two
      if (roundPrediction.hpPrediction2 !== null && roundPrediction.hpPrediction2 <= fighterTwoRound.HP) {
        totalScore += roundPrediction.hpPrediction2;
      }
  
      // Body Punches (BP) - Fighter Two
      if (roundPrediction.bpPrediction2 !== null && roundPrediction.bpPrediction2 <= fighterTwoRound.BP) {
        totalScore += roundPrediction.bpPrediction2;
      }
  
      // Total Punches (TP) - Fighter Two
      if (roundPrediction.tpPrediction2 !== null && roundPrediction.tpPrediction2 <= fighterTwoRound.TP) {
        totalScore += roundPrediction.tpPrediction2;
      }
  
      // Picking Round Winner (RW) - Fighter Two
      if (roundPrediction.rwPrediction2 !== null && roundPrediction.rwPrediction2 === fighterTwoRound.RW) {
        totalScore += roundPrediction.rwPrediction2;
      }
  
      // Knock Out (KO) - Fighter Two
      if (roundPrediction.koPrediction2 !== null) {
        if (roundPrediction.koPrediction2 === fighterTwoRound.KO) {
          totalScore += fighterTwoRound.KO;
        } else {
          totalScore += 0; // 25 points for wrong KO pick
        }
      }
    });
  
    return totalScore;
    
  };
  

    const renderRoundResults = (predictions) => {
        return predictions.map((round, index) => {
            // Check if any meaningful prediction is made for the current round
            const hasValidPredictions = round.hpPrediction1 !== null || round.bpPrediction1 !== null || 
                                        round.tpPrediction1 !== null || round.rwPrediction1 !== null || 
                                        round.koPrediction1 !== null || round.hpPrediction2 !== null || 
                                        round.bpPrediction2 !== null || round.tpPrediction2 !== null || 
                                        round.rwPrediction2 !== null || round.koPrediction2 !== null;
    
            let roundPoints = 0;
            if (hasValidPredictions) {
                const fighterOneRound = match.BoxingMatch.fighterOneStats[index];
                const fighterTwoRound = match.BoxingMatch.fighterTwoStats[index];
    
                roundPoints = calculateRoundPoints(round, fighterOneRound, fighterTwoRound);
                totalPoints += roundPoints;
            }
    
            return (
                <div key={index} className='roundResultDiv'>
                    <h1>Round {round.round} Complete</h1>
                    <div className='line'></div>
                    <div className='scoresWrapper'>
                        {/* Render prediction scores */}
                        <div className='scoresOfRound'>
                            <h2>HP</h2>
                            <div className='scoreBox'>
                                <p>{round.hpPrediction1 !== null ? round.hpPrediction1 : '-'}</p>
                            </div>
                        </div>
                        <div className='scoresOfRound'>
                            <h2>HP</h2>
                            <div className='scoreBox'>
                                <p>{round.hpPrediction2 !== null ? round.hpPrediction2 : '-'}</p>
                            </div>
                        </div>
                        <div className='scoresOfRound'>
                            <h2>BP</h2>
                            <div className='scoreBox'>
                                <p>{round.bpPrediction1 !== null ? round.bpPrediction1 : '-'}</p>
                            </div>
                        </div>
                        <div className='scoresOfRound'>
                            <h2>BP</h2>
                            <div className='scoreBox'>
                                <p>{round.bpPrediction2 !== null ? round.bpPrediction2 : '-'}</p>
                            </div>
                        </div>
                        <div className='scoresOfRound'>
                            <h2>TP</h2>
                            <div className='scoreBox'>
                                <p>{round.tpPrediction1 !== null ? round.tpPrediction1 : '-'}</p>
                            </div>
                        </div>
                        <div className='scoresOfRound'>
                            <h2>TP</h2>
                            <div className='scoreBox'>
                                <p>{round.tpPrediction2 !== null ? round.tpPrediction2 : '-'}</p>
                            </div>
                        </div>
                        <div className='scoresOfRound'>
                            <h2>RW</h2>
                            <div className='scoreBox'>
                                <p>{round.rwPrediction1 !== null ? round.rwPrediction1 : '-'}</p>
                            </div>
                        </div>
                        <div className='scoresOfRound'>
                            <h2>RL</h2>
                            <div className='scoreBox'>
                                <p>{round.rwPrediction2 !== null ? round.rwPrediction2 : '-'}</p>
                            </div>
                        </div>
                        <div className='scoresOfRound'>
                            <h2>KO</h2>
                            <div className='scoreBox'>
                                <p>{round.koPrediction1 !== null ? round.koPrediction1 : '-'}</p>
                            </div>
                        </div>
                        <div className='scoresOfRound'>
                            <h2>SP</h2>
                            <div className='scoreBox'>
                                <p>{round.koPrediction2 !== null ? round.koPrediction2 : '-'}</p>
                            </div>
                        </div>
                        <div className='scoresOfRound'>
                            <h3>Points<span className='toRemove'> total</span></h3>
                            <div className='scoreBoxSpecial'>
                                <p>{roundPoints}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };


    const userScore = scores.length > 0 ? scores[0] : null;

    return (
        <div className='finishedFightUserBoard'>
            <div className='fightLeaderboard'>
                <div className='fightDetails global-leaderboard'>
                    <div className='member-header'>
                        <div className='member-header-image'>
                            <img src={user.profileUrl} alt="Logo" />
                        </div>
                        <h3><span className='toRemove'>Member Name - </span>{user.firstName} {user.lastName}</h3>
                        <h3><span className='toRemove'>Current </span>Plan: {user.currentPlan}</h3>
                    </div>
                    <div className='fightwalletWrap'>
                        <div className='totalPoints'>
                            <h1 className='fightTypeInFightDetails'>
                                Fight type: <span>{match.matchCategory}</span> - 
                                <span style={{color:"#38b90c"}}>{match.matchType} </span> - 
                                <span>{match.matchFighterA} </span> VS <span> {match.matchFighterB} </span>
                            </h1>
                            <h1 style={{textAlign:'left'}}>POT: <span style={{color:"#38b90c"}}>{match.pot}</span> &nbsp;Players: <span style={{color:"#38b90c"}}>500</span></h1>
                        </div>
                        <div className='fightWallet'>
                            <h1><i className="fa fa-shopping-bag" aria-hidden="true"></i> Fight Wallet</h1>
                            <h2>Tokens Remaining: <span>{user.tokens}</span></h2>
                        </div>
                    </div>
                    <div className='homeThird'>
                        <div className='fightersImagesInFightDetails'>
                            <div className='flexColumn'>
                                <div className='imgWrapFights' style={{border:'none'}}>
                                    <img src={match.fighterAImage} style={{border:'3px solid blue'}} alt={match.matchFighterA} />
                                </div>
                                <h1 className='fightTypeInFightDetails'>{match.matchFighterA}</h1>
                            </div>
                            <h1>VS</h1>
                            <div className='flexColumn'>
                                <div className='imgWrapFights' style={{border:'none'}}>
                                    <img src={match.fighterBImage} style={{border:'3px solid red'}} alt={match.matchFighterB} />
                                </div>
                                <h1 className='fightTypeInFightDetails'>{match.matchFighterB}</h1>
                            </div>
                        </div>   
                        <div className="videoWrapper">
                            <iframe
                                src="https://www.youtube.com/embed/e3osGj488Us"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className='leaderboardHeading'>
                            <h3>FIGHT COMPLETED</h3>
                        </div>
                        <div className='roundResultsWrapper'>
                            {userScore ? renderRoundResults(userScore.predictions) : <p>No data available.</p>}
                            <div className='winnerDiv'>
                            <div className='winnerSuDivbOne'>
            <div className='winnerImg'>
                <img src={winner.profileUrl} alt="Winner" />
            </div>
            <div className='winnerDetails'>
                <h1>Winner</h1>
                <h2>{winner.firstName}<span className='toRemove'> {winner.lastName}</span></h2>
            </div>
        </div>
                                <div className='winnerSibDivTwo'>
                                    <h1>Points Grand Total</h1>
                                    <h2>{totalPoints}</h2>
                                </div>
                            </div>
                        </div>  
                    </div>  
                </div>
            </div>
        </div>
    );
};

export default FinishedFightUserBoard;
