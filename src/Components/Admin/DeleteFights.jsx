import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../../Redux/matchSlice';
import EditMatch from './EditMatch'; // Import your EditMatch component
import "./deleteFights.css";

const DeleteFights = () => {
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches.data);
  const matchStatus = useSelector((state) => state.matches.status);

  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [selectedAffiliateId, setSelectedAffiliateId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(''); 
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode

  useEffect(() => {
    if (matchStatus === 'idle') {
      dispatch(fetchMatches());
    }
  }, [matchStatus, dispatch]);

  const handleMatchClick = (id, affiliateId) => {
    setSelectedMatchId(id);
    setSelectedAffiliateId(affiliateId);
    setShowPopup(true);
    setPopupMessage('Delete or Edit this match?');
  };

  const handleConfirmDelete = async () => {
    if (selectedMatchId) {
      try {
        let url = `https://fantasymmadness-game-server-three.vercel.app/api/matches/${selectedMatchId}`;
        if (selectedAffiliateId) {
          url += `?affiliateId=${selectedAffiliateId}`;
        }
        const response = await fetch(url, { method: 'DELETE' });
        const responseData = await response.json();

        if (response.ok) {
          dispatch(fetchMatches());
          setPopupMessage('Match deleted successfully');
          setTimeout(() => {
            setShowPopup(false);
            setSelectedMatchId(null);
            setSelectedAffiliateId(null);
          }, 1000);
        } else {
          setPopupMessage('Failed to delete the match');
          setTimeout(() => {
            setShowPopup(false);
          }, 1000);
        }
      } catch (error) {
        setPopupMessage('Server error, please try again later');
        setTimeout(() => {
          setShowPopup(false);
        }, 1000);
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setShowPopup(false); // Close the popup
  };

  const handleCancelDelete = () => {
    setShowPopup(false);
    setSelectedMatchId(null);
    setSelectedAffiliateId(null);
  };

  if (isEditing && selectedMatchId) {
    return <EditMatch matchId={selectedMatchId} isShadow={false} />; // Render EditMatch with matchId as a prop
  }

  return (
    <div>
      <div className='adminWrapper'>
        <div className='homeSecond' style={{ background: 'transparent' }}>
          <h1 className='second-main-heading'>Delete / Update Fights</h1>
          <div className="fightswrap">
            {matches.length > 0 ? (
              matches.map((match) => (
                <div
                  className="fightItem"
                  key={match._id}
                  onClick={() => handleMatchClick(match._id, match.affiliateId || null)}
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
                        <h1>{match.matchCategoryTwo || match.matchCategory}</h1>
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
              <p className='noMatch'>No upcoming matches</p>
            )}
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>{popupMessage}</h2>
            <div className="popup-actions">
              <button onClick={handleConfirmDelete}>Delete</button>
              <button onClick={handleEditClick}>Edit</button>
              <button onClick={handleCancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteFights;
