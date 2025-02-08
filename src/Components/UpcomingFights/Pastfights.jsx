import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../../Redux/matchSlice';
import './UpcomingFightsUser.css';
import { useNavigate } from 'react-router-dom';

const Pastfights = () => {
    const dispatch = useDispatch();
    const matches = useSelector((state) => state.matches.data);
    const matchStatus = useSelector((state) => state.matches.status);
    const [upcomingMatches, setUpcomingMatches] = useState([]);
    
    const navigate = useNavigate();
  
  
    const handleFightClick = () => {
      navigate('/login');
    };
    useEffect(() => {
        const today = new Date();
        const currentTime = new Date();
      
        const fetchPastMatches = async () => {
          try {
            // Fetch all affiliates
            const affiliateResponse = await fetch("https://fantasymmadness-game-server-three.vercel.app/affiliates");
            const affiliates = await affiliateResponse.json();
      
            // Fetch all users
            const usersResponse = await fetch("https://fantasymmadness-game-server-three.vercel.app/users");
            const users = await usersResponse.json();
      
            // Filter matches based on matchType and past date
            const filteredMatches = matches.map((match) => {
              const matchDateTime = new Date(`${match.matchDate?.split('T')[0]}T${match.matchTime}:00`);
      
              if (match.matchType === "LIVE") {
                // For LIVE matches, check if they occurred in the past
                if (matchDateTime < currentTime) {
                  return { ...match, blurred: false }; // No blurring for past LIVE matches
                }
              } else if (match.matchType === "SHADOW") {
                // Find the affiliate by affiliateId for SHADOW matches
                const affiliate = affiliates.find(a => a._id === match.affiliateId);
                if (affiliate) {
                  const usersJoinedIds = affiliate.usersJoined.map(user => user.userId);
      
                  // Filter users who met token requirement
                  const eligibleUsers = users.filter(user => usersJoinedIds.includes(user._id) && parseInt(user.tokens, 10) >= match.matchTokens);
      
                  // Calculate the required number of users
                  const requiredUsers = match.pot / match.matchTokens;
      
                  // If eligible users were fewer than required, blur the match
                  const isBlurred = eligibleUsers.length < requiredUsers;
      
                  // Only include matches that occurred in the past
                  if (matchDateTime < currentTime) {
                    return { ...match, blurred: isBlurred }; // Add blur condition for past SHADOW matches
                  }
                }
              }
              return null;
            }).filter(Boolean); // Filter out null values where no condition is met
      
            // Set filtered matches as past matches
            setUpcomingMatches(filteredMatches); // Renaming to setUpcomingMatches, but holding past matches
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        fetchPastMatches();
      }, [matches]);
      
    
    useEffect(() => {
      if (matchStatus === 'idle') {
        dispatch(fetchMatches());
      }
    }, [matchStatus, dispatch]);
  
  
    return (
      <div className='upcomingFightsUser' style={{backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPosition:'center'}}>
       <i
          className="fa fa-arrow-circle-left homeup-arrow-circle"
          aria-hidden="true"
          onClick={() => navigate(-1)} // Go back to the previous page
        ></i>
     
        <div className='homeSecond' style={{ background: 'transparent' }}>
          <h1 className='second-main-heading'>Past fights <span className='toRemove'>/ Played fights</span></h1>
          <div className="fightswrap" data-aos="zoom-out">
            {upcomingMatches.length > 0 ? (
              upcomingMatches.map((match) => {
                
                return (
                  <div className='fightItem' key={match._id} onClick={handleFightClick}>
                    <div className={`fightersImages ${match.blurred ? 'blurred' : ''}`}>
                      <div className='fighterOne'>
                        <img src={match.fighterAImage} alt={match.matchFighterA} />
                      </div>
                      <div className='fighterTwo'>
                        <img src={match.fighterBImage} alt={match.matchFighterB} />
                      </div>
                    </div>
                    <div className='fightItemOne'>
                      <div className={`transformed-div ${match.blurred ? 'blurred' : ''}`}>
                        <h1>{match.matchFighterA} -VS- {match.matchFighterB}</h1>
                      </div>
                      <div className="transformed-div-two">
                        <div className='transformed-div-two-partOne'>
                          <h1>{match.matchCategoryTwo ? match.matchCategoryTwo : match.matchCategory}</h1>
                          <h1>{new Date(`1970-01-01T${match.matchTime}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</h1>
                        </div>
                        <div className='transformed-div-two-partTwo'>
                          <p>{match.matchDate?.split('T')[0]}</p> {/* Use the formatted date here */}
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
                        <p>{match.userPredictions.length}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className='noMatch'>No upcoming matches</p>
            )}
          </div>
        </div>
      </div>
    );
  }

export default Pastfights
