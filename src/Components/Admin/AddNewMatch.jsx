import React, { useState } from 'react';
import "./AddNewMatch.css";
import AdminPredictions from './AdminPredictions';
import { useNavigate } from 'react-router-dom';

const AddNewMatch = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    matchCategory: 'boxing',
    matchName: '',
    matchFighterA: '',
    matchFighterB: '',
    matchDescription: '',
    matchVideoUrl: '',
    matchDate: '',
    matchTime: '',
    matchTokens: '',
    matchType: 'LIVE',
    pot: '',
    fighterAImage: null,
    fighterBImage: null,
    promotionBackground: null,
    maxRounds: '',
    matchCategoryTwo: '',
  });
  
  const [buttonText, setButtonText] = useState('Add Match');  // State for button text
  const [displayCategory, setDisplayCategory] = useState('boxing');
  const [matchId, setMatchId] = useState(null); // State to store matchId for AdminPredictions
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [showAdminPredictions, setShowAdminPredictions] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'matchCategory') {
      let categoryOne = value;
      let categoryTwo = '';

      setDisplayCategory(value); // Update the displayed value

      if (value === 'kickboxing') {
        categoryOne = 'mma';
        categoryTwo = 'kickboxing';
      } else if (value === 'Bare-knuckle') {
        categoryOne = 'boxing';
        categoryTwo = 'Bare-knuckle';
      }

      setFormData({
        ...formData,
        matchCategory: categoryOne,
        matchCategoryTwo: categoryTwo,
      });
    } else {
      setFormData({
        ...formData,
        [name]: files ? files[0] : value // Handles both text and file inputs
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const url =
      formData.matchType === 'LIVE'
        ? 'https://fantasymmadness-game-server-three.vercel.app/addMatch'
        : 'https://fantasymmadness-game-server-three.vercel.app/addShadow';
  
    // Parse local date and time from form data (assuming it's in the user's local timezone)
    const localDateTime = new Date(`${formData.matchDate}T${formData.matchTime}:00`);
  
    const matchTimeEST = localDateTime.toTimeString().substring(0, 5); // Time part in HH:MM format
  
    // Create a new date object in the user's local timezone to avoid shifting issues
    const adjustedDate = new Date(localDateTime.getTime() + localDateTime.getTimezoneOffset() * 60000);
  
    // Format the adjusted date to ISO string
    const matchDateAdjusted = adjustedDate.toISOString().split('T')[0]; // This should now be the correct date
  
    const data = new FormData();
    data.append('matchCategory', formData.matchCategory);
    data.append('matchCategoryTwo', formData.matchCategoryTwo);
    data.append('matchName', formData.matchName);
    data.append('matchFighterA', formData.matchFighterA);
    data.append('matchFighterB', formData.matchFighterB);
    data.append('matchDescription', formData.matchDescription);
    data.append('matchVideoUrl', formData.matchVideoUrl);
    data.append('fighterAImage', formData.fighterAImage);  
    data.append('fighterBImage', formData.fighterBImage);
    data.append('maxRounds', formData.maxRounds);
    data.append('matchDate', matchDateAdjusted);  // Store adjusted date
    data.append('matchTime', matchTimeEST);  // Store local time
    data.append('matchType', formData.matchType);
    data.append('matchTokens', formData.matchTokens);
    data.append('pot', formData.pot);
    data.append('promotionBackground', formData.promotionBackground);
  
    setButtonText('Saving, please wait...');  // Update button text
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: data,
      });
  
      if (response.ok) {
        const result = await response.json();  // Parse the JSON response
        console.log('Response received:', result);  // Log the full response
        alert('Match added successfully!');
  
        if (formData.matchType === 'SHADOW') {
          setMatchId(result.matchId); // Store the matchId
          setShowPopup(true); // Show the popup
        } else {
          window.location.reload();  // Reload for LIVE matches
        }
      } else {
        alert('Failed to add match.');
      }
    } catch (error) {
      console.error('Error adding match:', error);
      alert('An error occurred while adding the match.');
    } finally {
      setButtonText('Add Match');  // Revert button text
    }
  };
  
  
  const handlePopupResponse = (response) => {
    setShowPopup(false); // Hide the popup
    if (response === 'yes') {
      setShowAdminPredictions(true); // Trigger rendering of AdminPredictions
    } else {
      window.location.reload();
    }
  };
  
  if (showAdminPredictions && matchId) {
    return <AdminPredictions matchId={matchId} filter={'shadowTemplate'} />;
  }
  
  return (
    <div className='addNewMatch'>
     <i
        className="fa fa-arrow-circle-left"
        aria-hidden="true"
        onClick={() => navigate(-1)} // Go back to the previous page
        style={{ position: 'absolute', top: '38px', left: '18%', cursor: 'pointer', fontSize: '24px', color: '#007bff', zIndex: '99999' }}
      ></i>
  
      <div className='registerCard'>
        <h1>Add New Match</h1>

        <form onSubmit={handleSubmit}>
          <div className='input-wrap-one'>
            <div className='input-group'>
              <label>Select Category <span>*</span></label>
              <select name='matchCategory' value={displayCategory} onChange={handleChange}>
                <option value="boxing">Boxing</option>
                <option value="mma">MMA</option>
                <option value="kickboxing">Kickboxing</option>
                <option value="Bare-knuckle">Bare-knuckle</option>
              </select>
            </div>

            <div className='input-group'>
              <label>Match Name <span>*</span></label>
              <input type='text' name='matchName' value={formData.matchName} onChange={handleChange} />
            </div>
          </div>

          <div className='input-wrap-two'>
            <div className='input-group'>
              <label>Fighter A <span>*</span></label>
              <input type='text' name='matchFighterA' value={formData.matchFighterA} onChange={handleChange} />
            </div>
            <div className='input-group'>
              <label>Fighter B <span>*</span></label>
              <input type='text' name='matchFighterB' value={formData.matchFighterB} onChange={handleChange} />
            </div>
          </div>

          <div className='input-wrap-one'>
            <div className='input-group' style={{ flexBasis: '100%' }}>
              <label>Match Description <span>*</span></label>
              <textarea name='matchDescription' style={{ border: '3px solid #ccc' }} value={formData.matchDescription} onChange={handleChange} />
            </div>
          </div>

          {formData.matchType === 'LIVE' && (
            <>
              <div className='input-wrap-one'>
                <div className='input-group'>
                  <label>Match Date <span>*</span></label>
                  <input type='date' name='matchDate' value={formData.matchDate} onChange={handleChange} />
                </div>
                <div className='input-group'>
                  <label>Match Time <span>*</span></label>
                  <input type='time' name='matchTime' value={formData.matchTime} onChange={handleChange} />
                </div>
              </div>

              <div className='input-wrap-one'>
                <div className='input-group'>
                  <label>Match Tokens <span>*</span></label>
                  <input type='number' name='matchTokens' value={formData.matchTokens} onChange={handleChange} />
                </div>
                <div className='input-group'>
                  <label>POT <span>*</span></label>
                  <input type='number' name='pot' value={formData.pot} onChange={handleChange} />
                </div>
              </div>
            </>
          )}




         
          <div className='input-wrap-one'>
            <div className='input-group'>
              <label>Fighter 1 Image <span>*</span></label>
              <input type='file' name='fighterAImage' onChange={handleChange} />
            </div>
            <div className='input-group'>
              <label>Fighter 2 Image <span>*</span></label>
              <input type='file' name='fighterBImage' onChange={handleChange} />
            </div>
          </div>

          {formData.matchType === 'SHADOW' && (
            
            <div className='input-wrap-one'>
            <div className='input-group'>
              <label>Promotion Background <span>*</span></label>
              <input type='file' name='promotionBackground' onChange={handleChange} />
            </div>
             </div>

        )}



          <div className='input-wrap-one'>
            <div className='input-group'>
              <label>Fight <span>*</span></label>
              <select name='matchType' value={formData.matchType} onChange={handleChange}>
                <option value="LIVE">LIVE</option>
                <option value="SHADOW">SHADOW</option>
              </select>
            </div>
            <div className='input-group'>
              <label>Max Rounds <span>*</span></label>
              <input type='number' name='maxRounds' value={formData.maxRounds} onChange={handleChange} />
            </div>
          </div>

          <button type="submit" className='btn-grad' style={{ width: '50%' }}>{buttonText}</button>
        </form>

       
      </div>



      {showPopup && (
        <div className='popup'>
          <h2>Want to submit scores now?</h2>
          <button onClick={() => handlePopupResponse('yes')}>Yes</button>
          <button onClick={() => handlePopupResponse('no')}>Not Now</button>
        </div>
      )}
    </div>
  );
};

export default AddNewMatch;
