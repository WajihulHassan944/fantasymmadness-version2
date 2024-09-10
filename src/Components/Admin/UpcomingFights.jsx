import React, { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../../Redux/matchSlice';
import AdminPredictions from './AdminPredictions';
import ShowScores from './ShowScores';

const UpcomingFights = () => {
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches.data);
  const matchStatus = useSelector((state) => state.matches.status);
  const [selectedMatchId, setSelectedMatchId] = useState(null); // State to store the selected match ID
  const [finishedMatchId, setFinishedMatchId] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (matchStatus === 'idle') {
      dispatch(fetchMatches());
    }
  }, [matchStatus, dispatch]);

  
  const handleMatchClick = (matchId) => {
    setSelectedMatchId(matchId); // Set the selected match ID
  };
  const handleFinishedMatchClick = (matchId) => {
    setFinishedMatchId(matchId); // Set the selected match ID
  };

  
  // Render the FightCosting component if a match is selected
  if (selectedMatchId) {
    return <AdminPredictions matchId={selectedMatchId} />;
  }

  if (finishedMatchId) {
    return <ShowScores matchId={finishedMatchId} />;
  }

  const filteredMatches = matches.filter((match) => {
    if (filter === 'All') return true;
    return match.matchStatus === filter;
  });
  

  return (
   <div className='adminWrapper'>
      <div className='homeSecond' style={{ background: 'transparent' }}>
        <h1 className='second-main-heading'><span className='toRemove'>Upcoming fights /</span> Active fights</h1>

        <div className='controls'>
          <h5 className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>All</h5>
          <h5 className={filter === 'Finished' ? 'active' : ''} onClick={() => setFilter('Finished')}>Finished Fights</h5>
          <h5 className={filter === 'Ongoing' ? 'active' : ''} onClick={() => setFilter('Ongoing')}>Active Fights</h5>
        </div>

        <div className="fightswrap">
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match) => (
              <div
                className="fightItem"
                key={match._id}
                onClick={match.matchStatus === 'Ongoing' 
                  ? () => handleMatchClick(match._id) 
                  : () => handleFinishedMatchClick(match._id)
                }
              >
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
                    <h1>Status</h1>
                    <p>{match.matchStatus}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className='noMatch'>No matches found</p>
          )}
        </div>
      </div>
    </div>
     );
}

export default UpcomingFights;
