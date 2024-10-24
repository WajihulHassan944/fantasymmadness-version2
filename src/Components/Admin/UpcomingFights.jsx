import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../../Redux/matchSlice';
import AdminPredictions from './AdminPredictions';
import ShowScores from './ShowScores';
import { useNavigate } from 'react-router-dom';

const UpcomingFights = () => {
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches.data);
  const matchStatus = useSelector((state) => state.matches.status);
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [finishedMatch, setFinishedMatch] = useState({ id: null, filter: null });
const [finishedShadow, setFinishedShadow] = useState({ id: null, filter: null });
const [filter, setFilter] = useState('All');
  const [shadowTemplates, setShadowTemplates] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    if (matchStatus === 'idle') {
      dispatch(fetchMatches());
    }
  }, [matchStatus, dispatch]);

  useEffect(() => {
    // Fetch Shadow Template data only when the filter is set to "Shadow Templates"
    if (filter === 'Shadow Templates') {
      fetch('https://fantasymmadness-game-server-three.vercel.app/shadow')
        .then((response) => response.json())
        .then((data) => setShadowTemplates(data))
        .catch((error) => console.error('Error fetching shadow templates:', error));
    }
  }, [filter]);

  const handleMatchClick = (matchId) => {
    setSelectedMatchId(matchId); 
  };
  const handleFinishedMatchClick = (matchId, filter) => {
    setFinishedMatch({ id: matchId, filter });
    // Additional logic if needed
  };
  
  const handleFinishedShadowClick = (matchId, filter) => {
    setFinishedShadow({ id: matchId, filter });
    // Additional logic if needed
  };
  
  const handleShadowTemplateClick = (matchId) => {
    setSelectedMatchId(matchId); // Directly set match ID for Shadow Templates, no date/time check
  };

  const currentTime = new Date();

  if (selectedMatchId) {
    const selectedMatch = filter === 'Shadow Templates'
      ? shadowTemplates.find(match => match._id === selectedMatchId)
      : matches.find(match => match._id === selectedMatchId);
  
    if (selectedMatch) {
      // Pass 'shadowTemplate' if filter is 'Shadow Templates', else pass 'normal'
      const filterProp = filter === 'Shadow Templates' ? 'shadowTemplate' : 'normal';
  
      if (filterProp === 'normal') {
        const matchDateTime = new Date(`${selectedMatch.matchDate.split('T')[0]}T${selectedMatch.matchTime}:00`);
        if (currentTime >= matchDateTime) {
          return (
            <>
              <i
                className="fa fa-arrow-circle-left"
                aria-hidden="true"
                onClick={() => setSelectedMatchId(null)} // Go back to the previous component
                style={{ position: 'absolute', top: '38px', left: '18%', cursor: 'pointer', fontSize: '24px', color: '#007bff', zIndex: '99999' }}
              ></i>
              <AdminPredictions matchId={selectedMatchId} filter={filterProp} />
            </>
          );
        } else {
          alert('The match time has not been reached yet.');
        }
      } else {
        return (
          <>
            <i
              className="fa fa-arrow-circle-left"
              aria-hidden="true"
              onClick={() => setSelectedMatchId(null)} // Go back to the previous component
              style={{ position: 'absolute', top: '38px', left: '18%', cursor: 'pointer', fontSize: '24px', color: '#007bff', zIndex: '99999' }}
            ></i>
            <AdminPredictions matchId={selectedMatchId} filter={filterProp} />
          </>
        );
      }
    }
  }
  

  if (finishedMatch.id) {
    return (
      <>
        <i
          className="fa fa-arrow-circle-left"
          aria-hidden="true"
          onClick={() => setFinishedMatch({ id: null, filter: null })} // Go back to the previous component
          style={{ position: 'absolute', top: '38px', left: '18%', cursor: 'pointer', fontSize: '24px', color: '#007bff', zIndex: '99999' }}
        ></i>
        <ShowScores matchId={finishedMatch.id} filter={finishedMatch.filter} />
      </>
    );
  }
  
  if (finishedShadow.id) {
    return (
      <>
        <i
          className="fa fa-arrow-circle-left"
          aria-hidden="true"
          onClick={() => setFinishedShadow({ id: null, filter: null })} // Go back to the previous component
          style={{ position: 'absolute', top: '38px', left: '18%', cursor: 'pointer', fontSize: '24px', color: '#007bff', zIndex: '99999' }}
        ></i>
        <ShowScores matchId={finishedShadow.id} filter={finishedShadow.filter} />
      </>
    );
  }
  

  const filteredMatches = filter === 'Shadow Templates' ? shadowTemplates : matches.filter((match) => {
    if (filter === 'All') return true;
    return match.matchStatus === filter;
  });

  return (
    <div className='adminWrapper'>
     <i
        className="fa fa-arrow-circle-left"
        aria-hidden="true"
        onClick={() => navigate(-1)} // Go back to the previous page
        style={{ position: 'absolute', top: '38px', left: '18%', cursor: 'pointer', fontSize: '24px', color: '#007bff', zIndex: '99999' }}
      ></i>
  
      <div className='homeSecond' style={{ background: 'transparent' }}>
        <h1 className='second-main-heading'>
          <span className='toRemove'>Upcoming fights /</span> Active fights
        </h1>

        <div className='controls'>
          <h5 className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>All</h5>
          <h5 className={filter === 'Finished' ? 'active' : ''} onClick={() => setFilter('Finished')}>Finished Fights</h5>
          <h5 className={filter === 'Ongoing' ? 'active' : ''} onClick={() => setFilter('Ongoing')}>Active Fights</h5>
          <h5 className={filter === 'Shadow Templates' ? 'active' : ''} onClick={() => setFilter('Shadow Templates')}>Shadow Templates</h5>
        </div>

        <div className="fightswrap">
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match) => (
              <div
                className="fightItem"
                key={match._id}
                onClick={
    filter === 'Shadow Templates' 
      ? (match.matchStatus === 'Ongoing' 
          ? () => handleShadowTemplateClick(match._id) 
          : () => handleFinishedShadowClick(match._id, 'shadowTemplate')) 
      : (match.matchStatus === 'Ongoing' 
          ? () => handleMatchClick(match._id) 
          : () => handleFinishedMatchClick(match._id, 'normal'))
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
                      <h1>{match.matchCategoryTwo ? match.matchCategoryTwo : match.matchCategory}</h1>
                      {filter !== 'Shadow Templates' && (
                        <h1>{new Date(`1970-01-01T${match.matchTime}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</h1>
                      )}
                    </div>
                    <div className='transformed-div-two-partTwo'>
                      {filter !== 'Shadow Templates' && (
                        <p>{match.matchDate.split('T')[0]}</p>
                      )}
                      <h1>{match.matchType}</h1>
                      {filter !== 'Shadow Templates' && (
    <h1>pot ${match.pot}</h1>
       )}
      
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
};

export default UpcomingFights;
