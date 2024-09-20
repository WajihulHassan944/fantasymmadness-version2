import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Dashboard.css';
import { fetchMatches } from '../../Redux/matchSlice';
import FightCosting from './FightCosting'
import FightLeaderboard from '../GlobalLeaderboard/FightLeaderboard';
import PurchaseTokensIntimation from './PurchaseTokensIntimation';
import FinishedFightUserBoard from '../FinishedFightUserBoard/FinishedFightUserBoard';

const Dashboard = () => {

  const dispatch = useDispatch();
  
  const matches = useSelector((state) => state.matches.data);
  const matchStatus = useSelector((state) => state.matches.status);
  const [selectedMatchId, setSelectedMatchId] = useState(null); // State to store the selected match ID
  const [completedMatchId, setCompletedMatchId] = useState(null); // State to store the selected match ID
  
  const [upcomingMatches, setUpcomingMatches] = useState([]);
const [loading, setLoading] = useState(true);

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



  useEffect(() => {
    const today = new Date();
    const currentTime = new Date();
  
    const fetchUpcomingMatches = async () => {
      try {
        // Fetch all affiliates
        const affiliateResponse = await fetch("https://fantasymmadness-game-server-three.vercel.app/affiliates");
        const affiliates = await affiliateResponse.json();
  
        // Fetch all users
        const usersResponse = await fetch("https://fantasymmadness-game-server-three.vercel.app/users");
        const users = await usersResponse.json();
  
        // Filter matches based on matchType
        const filteredMatches = matches.map((match) => {
          const matchDateTime = new Date(`${match.matchDate.split('T')[0]}T${match.matchTime}:00`);
  
          if (match.matchType === "LIVE") {
            // Only check date and time for LIVE matches
            if (matchDateTime >= today.setHours(0, 0, 0, 0) && currentTime < matchDateTime) {
              return { ...match, blurred: false }; // No blurring for LIVE matches
            }
          } else if (match.matchType === "SHADOW") {
            // Find the affiliate by affiliateId for SHADOW matches
            const affiliate = affiliates.find(a => a._id === match.affiliateId);
            if (affiliate) {
              const usersJoinedIds = affiliate.usersJoined.map(user => user.userId);
  
              // Filter users who meet token requirement
              const eligibleUsers = users.filter(user => usersJoinedIds.includes(user._id) && parseInt(user.tokens, 10) >= match.matchTokens);
              console.log(eligibleUsers.length);
  
              // Calculate the required number of users
              const requiredUsers = match.pot / match.matchTokens;
  
              // If eligible users are fewer than required, blur the match
              const isBlurred = eligibleUsers.length < requiredUsers;
  
              if (matchDateTime >= today.setHours(0, 0, 0, 0) && currentTime < matchDateTime) {
                return { ...match, blurred: isBlurred }; // Add blur condition for SHADOW matches
              }
            }
          }
          return null;
        }).filter(Boolean); // Filter out null values where no condition is met
  
        // Set filtered matches
        setUpcomingMatches(filteredMatches);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUpcomingMatches();
  }, [matches]);
  
    

  

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


  if (selectedMatchId) {
  const selectedMatch = matches.find(match => match._id === selectedMatchId);
    if (selectedMatch && user.tokens >= selectedMatch.matchTokens) {
      return <FightCosting matchId={selectedMatchId} />;
    } else {
      return <PurchaseTokensIntimation matchId={selectedMatchId} />;
    }
}

  
  // Check the match status and render the appropriate component
  if (completedMatchId) {
    const matchCom = matches.find(match => match._id === completedMatchId);
    if (matchCom && matchCom.matchStatus === "Ongoing") {
      return <FightLeaderboard matchId={completedMatchId} />;
    } else {
      return <FinishedFightUserBoard matchId={completedMatchId} />;
    }
  }





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
        prediction.userId && user._id && 
        prediction.userId.toString() === user._id.toString() && 
        prediction.predictionStatus === 'submitted'
      );
    return hasSubmittedPrediction;
  });
  

  return (
    <div className='userdashboard'>
      <div className='member-header'>
        <div className='member-header-image'>
          <img src={user.profileUrl} alt="Logo" data-aos="zoom-in" />
        </div>
        <h3 data-aos="zoom-in"><span className='toRemove'>Member Name: </span>{user.firstName} {user.lastName}</h3>
              <h3 data-aos="zoom-in"><span className='toRemove'>Current </span>Plan: {user.currentPlan}</h3>
      </div>

      <div className='fightwalletWrap'>
        <div className='fightWallet' data-aos="zoom-in">
          <h1><i className="fa fa-shopping-bag" aria-hidden="true"></i> Fight Wallet</h1>
          <h2>Tokens Remaining: <span>{user.tokens}</span></h2>
        </div>
      </div>

      <div className='fightsWrap'>
        <div className='upcomingFights fightscontainer' >
          <h1 className='fightsheadingone'>UPCOMING / ACTIVE FIGHTS</h1>
          {upcomingMatches.length > 0 ? (
            upcomingMatches.map((match) => (
              <div  className='fightItem'
              key={match._id} >
                <div className='fightersImages'>
                  <div className='fighterOne'>
                    <img src={match.fighterAImage} alt={match.matchFighterA} />
                  </div>
                  <div className='fighterTwo'>
                    <img src={match.fighterBImage} alt={match.matchFighterB} />
                  </div>
                </div>
                <div className='fightItemOne'>
                  <div className="transformed-div" >
                    <h1>{match.matchFighterA} -VS- {match.matchFighterB}</h1>
                  </div>
                  <div className={`transformed-div-two ${match.blurred ? 'blurred' : ''}`}>
                    <div className='transformed-div-two-partOne'>
                    <h1>{match.matchCategoryTwo ? match.matchCategoryTwo : match.matchCategory}</h1>
                      <h1>{new Date(`1970-01-01T${match.matchTime}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</h1>
                    </div>
                    <div className='transformed-div-two-partTwo'>
                      <p>{new Date(match.matchDate).toLocaleDateString()}</p>
                      <h1>{match.matchType}</h1>
                     
                    </div>
                  </div>
                </div>
                <div className={`fightItemTwo ${match.blurred ? 'blurred' : ''}`}>
                  <div className="transformed-div-three">
                    <p>{match.matchDescription}</p>
                  </div>
                  <div className="transformed-div-four">
                    <h1>Players</h1>
                    <p>{match.userPredictions.length}</p>
                  </div>
                </div>    
              </div>
            ))
          ) : (
            <p className='noMatch'>No upcoming matches</p>
          )}
        </div>



        <div className='completedFights fightscontainer'>
  <h1 className='fightsheadingtwo'>YOUR COMPLETED FIGHTS</h1>

  {completedMatches.length > 0 ? (
    completedMatches.map((match) => {
      const { diffHrs, diffMins, hasStarted } = getRemainingTime(match.matchDate, match.matchTime);

      return (
        <div className="fightItem" key={match._id}  onClick={() => handleCompletedMatchClick(match._id)}   >
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
    {
      match.matchCategory === "boxing" ? (
        <>
          <div className='transformedDivBox'>HP</div>
          <div className='transformedDivBox'>BP</div>
          <div className='transformedDivBox'>TP</div>
          <div className='transformedDivBox'>RW</div>
          <div className='transformedDivBox'>KO</div>
          <div className='transformedDivBox'>{match.matchCategoryTwo ? match.matchCategoryTwo : match.matchCategory} {match.matchStatus}</div>
        </>
      ) : (
        <>
          <div className='transformedDivBox'>ST</div>
          <div className='transformedDivBox'>KI</div>
          <div className='transformedDivBox'>KN</div>
          <div className='transformedDivBox'>RW</div>
          <div className='transformedDivBox'>KO</div>
          <div className='transformedDivBox'>{match.matchCategoryTwo ? match.matchCategoryTwo : match.matchCategory} {match.matchStatus}</div>
        </>
      )
    }
  </div>
  <div className="transformed-div-four">
    <h1>Players</h1>
    <p>{match.userPredictions.length}</p>
  </div>
</div>

<div className="transformed-five">
  {
    match.matchCategory === "boxing" ? (
      <>
        <div className='transformedDivBox'>HP</div>
        <div className='transformedDivBox'>BP</div>
        <div className='transformedDivBox'>TP</div>
        <div className='transformedDivBox'>RW</div>
        <div className='transformedDivBox'>KO</div>
      </>
    ) : (
      <>
        <div className='transformedDivBox'>ST</div>
        <div className='transformedDivBox'>KI</div>
        <div className='transformedDivBox'>KN</div>
        <div className='transformedDivBox'>RW</div>
        <div className='transformedDivBox'>KO</div>
      </>
    )
  }
</div>

        </div>
      );
    })
  ) : (
    <p className='noMatch'>No completed matches</p>
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
          prediction.userId === user._id && prediction.predictionStatus === 'submitted'
        )
      )
      .length > 0 ? (
        // Map over filtered matches
        upcomingMatches
          .filter((match) =>
            match.userPredictions &&
            !match.userPredictions.some(prediction =>
              prediction.userId === user._id && prediction.predictionStatus === 'submitted'
            )
          )
          .map((match) => {
            const { diffHrs, diffMins, hasStarted } = getRemainingTime(match.matchDate, match.matchTime);

            return (
              <div
              className='fightItem'
              key={match._id}
              onClick={() => {
                if (match.matchType === "SHADOW" && match.blurred) {
                  alert("Affiliate criteria has not been met for this SHADOW match.");
                } else {
                  handleMatchClick(match._id);
                }
              }}
             
            >   <div className='fightersImages'>
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
                  <div className={`transformed-div-two ${match.blurred ? 'blurred' : ''}`}>
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
                <div className={`fightItemTwo ${match.blurred ? 'blurred' : ''}`}>
  <div className="transformed-three">
    {
      match.matchCategory === "boxing" ? (
        <>
          <div className='transformedDivBox'>HP</div>
          <div className='transformedDivBox'>BP</div>
          <div className='transformedDivBox'>TP</div>
          <div className='transformedDivBox'>RW</div>
          <div className='transformedDivBox'>KO</div>
          <div className='transformedDivBox'>{match.matchCategoryTwo ? match.matchCategoryTwo : match.matchCategory} {match.matchStatus}</div>
        </>
      ) : (
        <>
          <div className='transformedDivBox'>ST</div>
          <div className='transformedDivBox'>KI</div>
          <div className='transformedDivBox'>KN</div>
          <div className='transformedDivBox'>RW</div>
          <div className='transformedDivBox'>KO</div>
          <div className='transformedDivBox'>{match.matchCategoryTwo ? match.matchCategoryTwo : match.matchCategory} {match.matchStatus}</div>
        </>
      )
    }
  </div>
  <div className="transformed-div-four">
    <h1>Players</h1>
    <p>{match.userPredictions.length}</p>
  </div>
</div>

<div className={`transformed-five ${match.blurred ? 'blurred' : ''}`}>
  {
    match.matchCategory === "boxing" ? (
      <>
        <div className='transformedDivBox'>HP</div>
        <div className='transformedDivBox'>BP</div>
        <div className='transformedDivBox'>TP</div>
        <div className='transformedDivBox'>RW</div>
        <div className='transformedDivBox'>KO</div>
      </>
    ) : (
      <>
        <div className='transformedDivBox'>ST</div>
        <div className='transformedDivBox'>KI</div>
        <div className='transformedDivBox'>KN</div>
        <div className='transformedDivBox'>RW</div>
        <div className='transformedDivBox'>KO</div>
      </>
    )
  }
</div>

              </div>
            );
          })
      ) : (
        <p className='noMatch'>No pending matches</p>
      )
  ) : (
    <p className='noMatch'>No pending matches</p>
  )}

</div>

      </div>
    </div>
  )
}

export default Dashboard;
