import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../../Redux/matchSlice';
import "./deleteFights.css";

const DeleteFights = () => {
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches.data);
  const matchStatus = useSelector((state) => state.matches.status);


  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [selectedAffiliateId, setSelectedAffiliateId] = useState(null); // State to store affiliateId
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(''); // State to manage popup message

  useEffect(() => {
    if (matchStatus === 'idle') {
      dispatch(fetchMatches());
    }
  }, [matchStatus, dispatch]);

  const handleMatchDeleteClick = (id, affiliateId) => {
    setSelectedMatchId(id);
    setSelectedAffiliateId(affiliateId); // Store the affiliateId (it can be null/undefined)
    setShowPopup(true);
    setPopupMessage('Are you sure you want to delete this match?');
  };

  const handleConfirmDelete = async () => {
    if (selectedMatchId) {
      try {
        // Construct the URL with or without affiliateId based on its existence
        let url = `https://fantasymmadness-game-server-three.vercel.app/api/matches/${selectedMatchId}`;
        if (selectedAffiliateId) {
          url += `?affiliateId=${selectedAffiliateId}`; // Add affiliateId only if it exists
        }

        const response = await fetch(url, { method: 'DELETE' });

        if (response.ok) {
          dispatch(fetchMatches()); // Refresh the match list after deletion
          setPopupMessage('Match deleted successfully');
          setTimeout(() => {
            setShowPopup(false);
            setSelectedMatchId(null);
            setSelectedAffiliateId(null);
          }, 1000); // Hide popup after 1 second
        } else {
          setPopupMessage('Failed to delete the match');
          setTimeout(() => {
            setShowPopup(false);
            setSelectedMatchId(null);
            setSelectedAffiliateId(null);
          }, 1000);
        }
      } catch (error) {
        setPopupMessage('Server error, please try again later');
        setTimeout(() => {
          setShowPopup(false);
          setSelectedMatchId(null);
          setSelectedAffiliateId(null);
        }, 1000);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowPopup(false);
    setSelectedMatchId(null);
    setSelectedAffiliateId(null); // Clear affiliateId on cancel
  };

  return (
    <div>
      <div className='adminWrapper'>
        <div className='homeSecond' style={{ background: 'transparent' }}>
          <h1 className='second-main-heading'>Delete <span className='toRemove'>Previous</span> Fights</h1>
          <div className="fightswrap">
            {matches.length > 0 ? (
              matches.map((match) => (
                <div className="fightItem" key={match._id} onClick={() => handleMatchDeleteClick(match._id, match.affiliateId || null)}>
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
            {!popupMessage.includes('deleted successfully') && ( // Hide buttons if success message is shown
              <div className="popup-actions">
                <button onClick={handleConfirmDelete}>Yes, Delete</button>
                <button onClick={handleCancelDelete}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteFights;
