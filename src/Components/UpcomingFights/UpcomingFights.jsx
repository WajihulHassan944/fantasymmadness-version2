import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../../Redux/matchSlice';
import './UpcomingFightsUser.css';

const UpcomingFights = () => {
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches.data);
  const matchStatus = useSelector((state) => state.matches.status);

  useEffect(() => {
    if (matchStatus === 'idle') {
      dispatch(fetchMatches());
    }
  }, [matchStatus, dispatch]);

  // Filter matches to only include upcoming ones
  const today = new Date();
  const upcomingMatches = matches.filter((match) => new Date(match.matchDate) > today);

  return (
    <div className='upcomingFightsUser'>
      <div className='homeSecond' style={{ background: 'transparent' }}>
        <h1 className='second-main-heading'>Upcoming fights / Active fights</h1>
        <div className="fightswrap">
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
            <p className='noMatch'>No upcoming matches</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpcomingFights;
