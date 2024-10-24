import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../../Redux/matchSlice';
import EditMatch from './EditMatch'; // Import your EditMatch component
import "./deleteFights.css";
import { toast } from 'react-toastify';
import { format, toDate, toZonedTime } from 'date-fns-tz';
import { useNavigate } from 'react-router-dom';

const DeleteFights = () => {
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches.data);
  const matchStatus = useSelector((state) => state.matches.status);
const navigate = useNavigate();
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
      const deleteMatchPromise = new Promise(async (resolve, reject) => {
        try {
          let url = `https://fantasymmadness-game-server-three.vercel.app/api/matches/${selectedMatchId}`;
          if (selectedAffiliateId) {
            url += `?affiliateId=${selectedAffiliateId}`;
          }
  
          const response = await fetch(url, { method: 'DELETE' });
          const responseData = await response.json();
  
          if (response.ok) {
            dispatch(fetchMatches());  // Refresh match data
            resolve();  // Resolve promise on success
  
            setTimeout(() => {
              setShowPopup(false);
              setSelectedMatchId(null);
              setSelectedAffiliateId(null);
            }, 1000);
          } else {
            reject(new Error('Failed to delete the match'));  // Reject on error response
          }
        } catch (error) {
          reject(new Error('Server error, please try again later'));  // Reject on network error
        }
      });
  
      // Use toast.promise to handle pending, success, and error states
      toast.promise(deleteMatchPromise, {
        pending: 'Deleting match...',
        success: 'Match deleted successfully 👌',
        error: {
          render({ data }) {
            return data.message || 'Failed to delete match';
          }
        }
      }).finally(() => {
        setTimeout(() => {
          setShowPopup(false);  // Close popup after operation
        }, 1000);
      });
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
    return (
      <>
        <i
          className="fa fa-arrow-circle-left"
          aria-hidden="true"
          onClick={() => setIsEditing(false)} // Go back to the previous component
          style={{ position: 'absolute', top: '38px', left: '18%', cursor: 'pointer', fontSize: '24px', color: '#007bff', zIndex: '99999' }}
        ></i>
        <EditMatch matchId={selectedMatchId} isShadow={false} />
      </>
    );
  }
  
  const US_TIMEZONE = 'America/New_York';
  return (
    <div>
      <div className='adminWrapper'>
      <i
        className="fa fa-arrow-circle-left"
        aria-hidden="true"
        onClick={() => navigate(-1)} // Go back to the previous page
        style={{ position: 'absolute', top: '38px', left: '18%', cursor: 'pointer', fontSize: '24px', color: '#007bff', zIndex: '99999' }}
      ></i>
<div className='homeSecond' style={{ background: 'transparent' }}>
  <h1 className='second-main-heading'>Delete / Update Fights</h1>
  <div className="fightswrap">
    {matches.length > 0 ? (
      matches.map((match) => {
        return (
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
                  <h1>{new Date(`1970-01-01T${match.matchTime}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</h1>
                </div>
                <div className='transformed-div-two-partTwo'>
                  {/* Extracting the date and displaying it in the same line */}
                  <p>{match.matchDate.split('T')[0]}</p> 
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
        );
      })
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
