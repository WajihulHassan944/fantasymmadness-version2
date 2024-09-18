import React, { useEffect, useState } from 'react';
import FighterOne from "../../Assets/fighterOne.png";
import Logoimage from "../../Assets/myimg.jpg";
import "./FightLeaderboard.css";
import { useSelector, useDispatch } from 'react-redux';
import { stopMusic, playMusic } from '../../Redux/musicSlice';

const FightLeaderboard = ({ matchId }) => {
  const [scores, setScores] = useState([]);
  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.user);
  const matches = useSelector((state) => state.matches.data);
  const match = matches.find((m) => m._id === matchId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(stopMusic());

    fetch('https://fantasymmadness-game-server-three.vercel.app/api/scores')
      .then(response => response.json())
      .then(data => setScores(data.filter(score => score.matchId === matchId))) // Filter scores by matchId
      .catch(error => console.error('Error fetching scores:', error));

    fetch('https://fantasymmadness-game-server-three.vercel.app/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));

      return () => dispatch(playMusic());
  }, [matchId, dispatch]);

  






  const calculatePoints = (userPrediction, fighterOneStats, fighterTwoStats) => {
    let totalScore = 0;

    userPrediction.forEach((roundPrediction, index) => {
        const fighterOneRound = fighterOneStats[index];
        const fighterTwoRound = fighterTwoStats[index];

        if (!fighterOneRound || !fighterTwoRound || !roundPrediction) return;

        // For Boxing
        if (match.matchCategory === 'boxing') {
            // Fighter One Predictions
            // Head Punches (HP)
            if (roundPrediction.hpPrediction1 !== null && roundPrediction.hpPrediction1 <= fighterOneRound.HP) {
                totalScore += roundPrediction.hpPrediction1;
            }

            // Body Punches (BP)
            if (roundPrediction.bpPrediction1 !== null && roundPrediction.bpPrediction1 <= fighterOneRound.BP) {
                totalScore += roundPrediction.bpPrediction1;
            }

            // Total Punches (TP)
            if (roundPrediction.tpPrediction1 !== null && roundPrediction.tpPrediction1 <= fighterOneRound.TP) {
                totalScore += roundPrediction.tpPrediction1;
            }

            // Round Winner (RW)
            if (roundPrediction.rwPrediction1 !== null && roundPrediction.rwPrediction1 === fighterOneRound.RW) {
                totalScore += roundPrediction.rwPrediction1;
            }

            // Knock Out (KO)
            if (roundPrediction.koPrediction1 !== null && roundPrediction.koPrediction1 === fighterOneRound.KO) {
                totalScore += fighterOneRound.KO;
            }

            // Fighter Two Predictions
            // Head Punches (HP)
            if (roundPrediction.hpPrediction2 !== null && roundPrediction.hpPrediction2 <= fighterTwoRound.HP) {
                totalScore += roundPrediction.hpPrediction2;
            }

            // Body Punches (BP)
            if (roundPrediction.bpPrediction2 !== null && roundPrediction.bpPrediction2 <= fighterTwoRound.BP) {
                totalScore += roundPrediction.bpPrediction2;
            }

            // Total Punches (TP)
            if (roundPrediction.tpPrediction2 !== null && roundPrediction.tpPrediction2 <= fighterTwoRound.TP) {
                totalScore += roundPrediction.tpPrediction2;
            }

            // Round Winner (RW)
            if (roundPrediction.rwPrediction2 !== null && roundPrediction.rwPrediction2 === fighterTwoRound.RW) {
                totalScore += roundPrediction.rwPrediction2;
            }

            // Knock Out (KO)
            if (roundPrediction.koPrediction2 !== null && roundPrediction.koPrediction2 === fighterTwoRound.KO) {
                totalScore += fighterTwoRound.KO;
            }

        // For MMA
        } else if (match.matchCategory === 'mma') {
            // Fighter One Predictions
            // Strikes (ST)
            if (roundPrediction.hpPrediction1 !== null && roundPrediction.hpPrediction1 <= fighterOneRound.ST) {
                totalScore += roundPrediction.hpPrediction1;
            }

            // Kicks (KI)
            if (roundPrediction.bpPrediction1 !== null && roundPrediction.bpPrediction1 <= fighterOneRound.KI) {
                totalScore += roundPrediction.bpPrediction1;
            }

            // Knockdowns (KN)
            if (roundPrediction.tpPrediction1 !== null && roundPrediction.tpPrediction1 <= fighterOneRound.KN) {
                totalScore += roundPrediction.tpPrediction1;
            }

            // Elbow Strikes (EL)
            if (roundPrediction.elPrediction1 !== null && roundPrediction.elPrediction1 <= fighterOneRound.EL) {
                totalScore += roundPrediction.elPrediction1;
            }

            // Round Winner (RW)
            if (roundPrediction.rwPrediction1 !== null && roundPrediction.rwPrediction1 === fighterOneRound.RW) {
                totalScore += roundPrediction.rwPrediction1;
            }

            // Knock Out (KO)
            if (roundPrediction.koPrediction1 !== null && roundPrediction.koPrediction1 === fighterOneRound.KO) {
                totalScore += fighterOneRound.KO;
            }

            // Fighter Two Predictions
            // Strikes (ST)
            if (roundPrediction.hpPrediction2 !== null && roundPrediction.hpPrediction2 <= fighterTwoRound.ST) {
                totalScore += roundPrediction.hpPrediction2;
            }

            // Kicks (KI)
            if (roundPrediction.bpPrediction2 !== null && roundPrediction.bpPrediction2 <= fighterTwoRound.KI) {
                totalScore += roundPrediction.bpPrediction2;
            }

            // Knockdowns (KN)
            if (roundPrediction.tpPrediction2 !== null && roundPrediction.tpPrediction2 <= fighterTwoRound.KN) {
                totalScore += roundPrediction.tpPrediction2;
            }

            // Elbow Strikes (EL)
            if (roundPrediction.elPrediction2 !== null && roundPrediction.elPrediction2 <= fighterTwoRound.EL) {
                totalScore += roundPrediction.elPrediction2;
            }

            // Round Winner (RW)
            if (roundPrediction.rwPrediction2 !== null && roundPrediction.rwPrediction2 === fighterTwoRound.RW) {
                totalScore += roundPrediction.rwPrediction2;
            }

            // Knock Out (KO)
            if (roundPrediction.koPrediction2 !== null && roundPrediction.koPrediction2 === fighterTwoRound.KO) {
                totalScore += fighterTwoRound.KO;
            }
        }
    });

    return totalScore;
};


const getYouTubeEmbedUrl = (url) => {
  const videoId = url.split('youtu.be/')[1]?.split('?')[0];
  return `https://www.youtube.com/embed/${videoId}`;
};

  const renderLeaderboardItems = () => {
  
    return scores.map((score, index) => {
      const user = users.find(u => u._id === score.playerId);
      if (!user) return null;

      
  
      const totalPoints = match.matchCategory === 'boxing'  
      ? calculatePoints(score.predictions, match.BoxingMatch.fighterOneStats, match.BoxingMatch.fighterTwoStats, 'boxing')
      : calculatePoints(score.predictions, match.MMAMatch.fighterOneStats, match.MMAMatch.fighterTwoStats, 'mma');
  
      return (
        <div className='leaderboardItem' key={index} data-aos="zoom-in">
          <div className='leaderboard-item-image'><img src={user.profileUrl || FighterOne} alt={user.firstName} /></div>
          <h1>{user.firstName} <span className='toRemove'>{user.lastName}</span></h1>
          <h1 className='toRemove'>#RW</h1> <h1 className='toRemove'>#KO</h1>
          <h1>Points {totalPoints}</h1>
          <h1>#{index + 1}</h1>
        </div>
      );
    });
  };
    
  return (
    <div className='fightLeaderboard'>
      <div className='fightDetails global-leaderboard'>
        <div className='member-header'>
          <div className='member-header-image'>
            <img src={user.profileUrl} alt="Logo" data-aos="zoom-in" />
          </div>
          <h3 data-aos="zoom-in"><span className='toRemove'>Member Name -</span> {user.firstName} {user.lastName}</h3>
          <h3 data-aos="zoom-in"><span className='toRemove'>Current</span> Plan: {user.currentPlan}</h3>
        </div>

        <div className='fightwalletWrap'>
          <div className='totalPoints'>
            <h1 className='fightTypeInFightDetails' data-aos="zoom-in">
              Fight type: <span>{match.matchCategoryTwo ? match.matchCategoryTwo : match.matchCategory}</span> - 
              <span style={{color:"#38b90c"}}>{match.matchType} </span> - 
              <span>{match.matchFighterA} </span> VS <span> {match.matchFighterB} </span>
            </h1>
            <h1 data-aos="zoom-in" style={{textAlign:'left'}}>POT: <span style={{color:"#38b90c"}}>{match.pot}</span> &nbsp;Players: <span style={{color:"#38b90c"}}>{match.userPredictions.length}</span></h1>
          </div>
          
          <div className='fightWallet' data-aos="zoom-in">
            <h1><i className="fa fa-shopping-bag" aria-hidden="true"></i> Fight Wallet</h1>
            <h2>Tokens Remaining: <span>{user.tokens}</span></h2>
          </div>
        </div>

        <div className='homeThird'>
          <div className='fightersImagesInFightDetails' data-aos="zoom-in">
            <div className='flexColumn'>
              <div className='imgWrapFights' style={{border:'none'}} >
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
        src={getYouTubeEmbedUrl(match.matchVideoUrl)}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        
      ></iframe>
    </div>
          <div className='leaderboardHeading'><h3>Leaderboard</h3></div>
          <div className='controls'><h5 className='active'>All time</h5><h5>Last week</h5> <h5>Last month</h5></div>
          
          <div className='leaderboardItemsWrap'>
            {renderLeaderboardItems()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FightLeaderboard;
