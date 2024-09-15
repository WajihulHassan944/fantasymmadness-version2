import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../../Redux/matchSlice';
import './UpcomingFightsUser.css';
import { useNavigate } from 'react-router-dom';

const UpcomingFights = () => {
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches.data);
  const matchStatus = useSelector((state) => state.matches.status);

  const navigate = useNavigate();


  const handleFightClick = () => {
    navigate('/login');
  };


  useEffect(() => {
    if (matchStatus === 'idle') {
      dispatch(fetchMatches());
    }
  }, [matchStatus, dispatch]);

  const today = new Date();
const currentTime = new Date();

// Filter matches
const upcomingMatches = matches.filter((match) => {
  // Construct matchDateTime including both date and time
  const matchDateTime = new Date(`${match.matchDate.split('T')[0]}T${match.matchTime}:00`);

  // Return matches that are either in the future or today and haven't started yet
  return (
    matchDateTime >= today.setHours(0, 0, 0, 0) && 
    currentTime < matchDateTime
  );
});

  return (
    <div className='upcomingFightsUser'>
      <div className='homeSecond' style={{ background: 'transparent' }}>
        <h1 className='second-main-heading'>Upcoming fights <span className='toRemove'>/ Active fights</span></h1>
        <div className="fightswrap">
          {upcomingMatches.length > 0 ? (
            upcomingMatches.map((match) => (
              <div className="fightItem" key={match._id} onClick={handleFightClick} data-aos="zoom-out">
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
                    <h1>{match.matchCategoryTwo ? match.matchCategoryTwo : match.matchCategory}</h1>

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
                    <p>{match.userPredictions.length}</p>
                  </div>
                </div>    
              </div>
            ))
          ) : (
            <p className='noMatch'>No upcoming matches</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpcomingFights;
