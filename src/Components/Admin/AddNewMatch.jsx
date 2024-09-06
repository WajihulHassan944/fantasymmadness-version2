import React, { useState } from 'react';
import "./AddNewMatch.css";

const AddNewMatch = () => {
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
  });
  const [buttonText, setButtonText] = useState('Add Match');  // State for button text

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'https://fantasymmadness-game-server-three.vercel.app/addMatch';
    
    const data = new FormData();
    data.append('matchCategory', formData.matchCategory);
    data.append('matchName', formData.matchName);
    data.append('matchFighterA', formData.matchFighterA);
    data.append('matchFighterB', formData.matchFighterB);
    data.append('matchDescription', formData.matchDescription);
    data.append('matchVideoUrl', formData.matchVideoUrl);
    data.append('matchDate', formData.matchDate);
    data.append('matchTime', formData.matchTime);
    data.append('matchTokens', formData.matchTokens);
    data.append('matchType', formData.matchType);
    data.append('pot', formData.pot);
    data.append('fighterAImage', formData.fighterAImage);
    data.append('fighterBImage', formData.fighterBImage);

    
    data.append('approvalOfMatch', 'approved');

    setButtonText('Saving, please wait...');  // Update button text

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        alert('Match added successfully!');
        // Reload the page to reflect changes
        window.location.reload();
      } else {
        alert('Failed to add match.');
      }
    } catch (error) {
      console.error('Error adding match:', error);
      alert('An error occurred while adding the match.');
    } finally {
      setButtonText('Add Match');  // Revert button text if needed
    }
  };

  return (
    <div className='addNewMatch'>
      <div className='registerCard'>
        <h1>Add New Match</h1>

        <form onSubmit={handleSubmit}>
          <div className='input-wrap-one'>
            <div className='input-group'>
              <label>Select Category <span>*</span></label>
              <select name='matchCategory' value={formData.matchCategory} onChange={handleChange}>
                <option value="boxing">Boxing</option>
                <option value="mma">MMA</option>
                <option value="kickboxing">Kickboxing</option>
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

          <div className='input-wrap-one'>
            <div className='input-group'>
              <label>Video ID <span>*</span></label>
              <input type='text' name='matchVideoUrl' value={formData.matchVideoUrl} onChange={handleChange} />
            </div>
            <div className='input-group'>
              <label>Match Date <span>*</span></label>
              <input type='date' name='matchDate' value={formData.matchDate} onChange={handleChange} />
            </div>
          </div>

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

          <div className='input-wrap-one'>
            <div className='input-group'>
              <label>Match time <span>*</span></label>
              <input type='time' name='matchTime' value={formData.matchTime} onChange={handleChange} />
            </div>
            <div className='input-group'>
              <label>Match Tokens <span>*</span></label>
              <input type='number' name='matchTokens' value={formData.matchTokens} onChange={handleChange} />
            </div>
          </div>

          <div className='input-wrap-one'>
            <div className='input-group'>
              <label>Fight <span>*</span></label>
              <select name='matchType' value={formData.matchType} onChange={handleChange}>
                <option value="LIVE">LIVE</option>
                <option value="SHADOW">SHADOW</option>
              </select>
            </div>
            <div className='input-group'>
              <label>POT <span>*</span></label>
              <input type='number' name='pot' value={formData.pot} onChange={handleChange} />
            </div>
          </div>

          <button type="submit" className='btn-grad' style={{ width: '50%' }}>{buttonText}</button>
        </form>
      </div>
    </div>
  );
};

export default AddNewMatch;
