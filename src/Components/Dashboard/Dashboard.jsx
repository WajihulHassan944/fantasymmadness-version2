import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Dashboard.css';
import { fetchMatches } from '../../Redux/matchSlice';
import FightCosting from './FightCosting'
import FightLeaderboard from '../GlobalLeaderboard/FightLeaderboard';

const Dashboard = () => {

  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches.data);
  const matchStatus = useSelector((state) => state.matches.status);
  const [selectedMatchId, setSelectedMatchId] = useState(null); // State to store the selected match ID
  const [completedMatchId, setCompletedMatchId] = useState(null); // State to store the selected match ID
  
  const [time, setTime] = useState(new Date()); // State to trigger re-render every minute

  useEffect(() => {
    if (matchStatus === 'idle') {
      dispatch(fetchMatches());
    }
  }, [matchStatus, dispatch]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000); // Update time every minute

    return () => clearInterval(timer); // Clear interval on unmount
  }, []);

  const user = useSelector((state) => state.user); // Access user details from Redux store

  // Check if the user data is available before rendering
  if (!user || !user.firstName) {
    return <div>Loading...</div>;
  }

  const handleMatchClick = (matchId) => {
    setSelectedMatchId(matchId); // Set the selected match ID
  };


  const handleCompletedMatchClick = (matchId) => {
    setCompletedMatchId(matchId); // Set the selected match ID
  };


  // Render the FightCosting component if a match is selected
  if (selectedMatchId) {
    return <FightCosting matchId={selectedMatchId} />;
  }
  
  // Render the FightCosting component if a match is selected
  if (completedMatchId) {
    return <FightLeaderboard matchId={completedMatchId} />;
  }

  // Filter matches to only include upcoming ones
  const today = new Date();
  const upcomingMatches = matches.filter((match) => new Date(match.matchDate) > today);

  function getRemainingTime(matchDate, matchTime) {
    const [year, month, day] = matchDate.split('T')[0].split('-');
    const [hours, minutes] = matchTime.split(':');
  
    const matchDateTime = new Date(`${year}-${month}-${day}T${hours}:${minutes}`);
    
    // Get the current time
    const now = new Date();
    
    // Calculate the difference in milliseconds
    const diffMs = matchDateTime - now;
    
    // Convert the difference to hours and minutes
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    // Determine if the match has started
    const hasStarted = diffMs <= 0;
    
    return {
      diffHrs: hasStarted ? 0 : diffHrs,
      diffMins: hasStarted ? 0 : diffMins,
      hasStarted,
    };
  }
  
  const completedMatches = matches.filter((match) => {
    const hasSubmittedPrediction = match.userPredictions && 
      match.userPredictions.some(prediction => 
        prediction.userId.toString() === user.id.toString() && prediction.predictionStatus === 'submitted'
      );
    console.log('Checking match:', match);
    console.log('Has submitted prediction:', hasSubmittedPrediction);
    return hasSubmittedPrediction;
  });
  

  return (
    <div className='userdashboard'>
      <div className='member-header'>
        <div className='member-header-image'>
          <img src={user.profileUrl} alt="Logo" />
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

      <div className='fightsWrap'>
        <div className='upcomingFights fightscontainer'>
          <h1 className='fightsheadingone'>UPCOMING FIGHTS / ACTIVE FIGHTS</h1>
          {upcomingMatches.length > 0 ? (
            upcomingMatches.map((match) => (
              <div className="fightItem" key={match._id}>
                <div className='fightersImages'>
                  <div className='fighterOne'>
                    <img src={match.fighterAImage} alt={match.matchFighterA} />
                  </div>
                  <div className='fighterTwo'>
                    <img src={match.fighterBImage} alt={match.matchFighterB} />
                  </div>
                </div>
                <div className='fightItemOne'>
                  <div className="transformed-div">
                    <h1>{match.matchFighterA} -VS- {match.matchFighterB}</h1>
                  </div>
                  <div className="transformed-div-two">
                    <div className='transformed-div-two-partOne'>
                      <h1>{match.matchCategory}</h1>
                      <h1>{new Date(`1970-01-01T${match.matchTime}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</h1>
                    </div>
                    <div className='transformed-div-two-partTwo'>
                      <p>{new Date(match.matchDate).toLocaleDateString()}</p>
                      <h1>{match.matchType}</h1>
                      <h1>pot ${match.pot}</h1>
                    </div>
                  </div>
                </div>
                <div className='fightItemTwo'>
                  <div className="transformed-div-three">
                    <p>{match.matchDescription}</p>
                  </div>
                  <div className="transformed-div-four">
                    <h1>Players</h1>
                    <p>{match.matchTokens}</p>
                  </div>
                </div>    
              </div>
            ))
          ) : (
            <p>No upcoming matches</p>
          )}
        </div>



        <div className='completedFights fightscontainer'>
  <h1 className='fightsheadingtwo'>YOUR COMPLETED FIGHTS</h1>

  {completedMatches.length > 0 ? (
    completedMatches.map((match) => {
      const { diffHrs, diffMins, hasStarted } = getRemainingTime(match.matchDate, match.matchTime);

      return (
        <div className="fightItem" key={match._id}  onClick={() => handleCompletedMatchClick(match._id)}>
          <div className='fightersImages'>
            <div className='fighterOne'>
              <img src={match.fighterAImage} alt="Fighter One" />
            </div>
            <div className='fighterTwo'>
              <img src={match.fighterBImage} alt="Fighter Two" />
            </div>
          </div>
          <div className='fightItemOne'>
            <div className="transformed-div">
              <h1>{match.matchFighterA} -VS- {match.matchFighterB}</h1>
            </div>
            <div className="transformed-div-two">
              <div className='transformed-div-two-partOne'>
                <h1>{new Date(`1970-01-01T${match.matchTime}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} est</h1>
              </div>
              <div className='transformed-div-two-partTwo'>
                <p style={{marginLeft:'-15px'}}>
                  {hasStarted
                    ? "Fight has started"
                    : `Begins in ${diffHrs} hours ${diffMins} mins`}
                </p>
              </div>
            </div>
          </div>
          <div className='fightItemTwo'>
            <div className="transformed-three">
              <div className='transformedDivBox'>HP</div>
              <div className='transformedDivBox'>BP</div>
              <div className='transformedDivBox'>TP</div>
              <div className='transformedDivBox'>RW</div>
              <div className='transformedDivBox'>KO</div>
              <div className='transformedDivBox'>{match.matchCategory} pending</div>
            </div>
            <div className="transformed-div-four">
              <h1>Players</h1>
              <p>400</p>
            </div>
          </div>
          <div className="transformed-five">
            <div className='transformedDivBox'>HP</div>
            <div className='transformedDivBox'>BP</div>
            <div className='transformedDivBox'>TP</div>
            <div className='transformedDivBox'>RW</div>
            <div className='transformedDivBox'>KO</div>
          </div>
        </div>
      );
    })
  ) : (
    <p style={{color:'#fff'}}>No completed matches</p>
  )}
</div>


<div className='pendingFights fightscontainer'>
  <h1 className='fightsheadingthree'>Your Pending Fights</h1>

  {upcomingMatches.length > 0 ? (
    // Filter matches where user predictions are not submitted
    upcomingMatches
      .filter((match) =>
        match.userPredictions &&
        !match.userPredictions.some(prediction =>
          prediction.userId === user.id && prediction.predictionStatus === 'submitted'
        )
      )
      .length > 0 ? (
        // Map over filtered matches
        upcomingMatches
          .filter((match) =>
            match.userPredictions &&
            !match.userPredictions.some(prediction =>
              prediction.userId === user.id && prediction.predictionStatus === 'submitted'
            )
          )
          .map((match) => {
            const { diffHrs, diffMins, hasStarted } = getRemainingTime(match.matchDate, match.matchTime);

            return (
              <div className="fightItem" key={match._id} onClick={() => handleMatchClick(match._id)}>
                <div className='fightersImages'>
                  <div className='fighterOne'>
                    <img src={match.fighterAImage} alt="Fighter One" />
                  </div>
                  <div className='fighterTwo'>
                    <img src={match.fighterBImage} alt="Fighter Two" />
                  </div>
                </div>
                <div className='fightItemOne'>
                  <div className="transformed-div">
                    <h1>{match.matchFighterA} -VS- {match.matchFighterB}</h1>
                  </div>
                  <div className="transformed-div-two">
                    <div className='transformed-div-two-partOne'>
                      <h1>{new Date(`1970-01-01T${match.matchTime}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} est</h1>
                    </div>
                    <div className='transformed-div-two-partTwo'>
                      <p style={{ marginLeft: '-15px' }}>
                        {hasStarted
                          ? "Fight has started"
                          : `Begins in ${diffHrs} hours ${diffMins} mins`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='fightItemTwo'>
                  <div className="transformed-three">
                    <div className='transformedDivBox'>HP</div>
                    <div className='transformedDivBox'>BP</div>
                    <div className='transformedDivBox'>TP</div>
                    <div className='transformedDivBox'>RW</div>
                    <div className='transformedDivBox'>KO</div>
                    <div className='transformedDivBox'>{match.matchCategory} pending</div>
                  </div>
                  <div className="transformed-div-four">
                    <h1>Players</h1>
                    <p>400</p>
                  </div>
                </div>
                <div className="transformed-five">
                  <div className='transformedDivBox'>HP</div>
                  <div className='transformedDivBox'>BP</div>
                  <div className='transformedDivBox'>TP</div>
                  <div className='transformedDivBox'>RW</div>
                  <div className='transformedDivBox'>KO</div>
                </div>
              </div>
            );
          })
      ) : (
        <p>No pending matches</p>
      )
  ) : (
    <p>No pending matches</p>
  )}
</div>

      </div>
    </div>
  )
}

export default Dashboard;
