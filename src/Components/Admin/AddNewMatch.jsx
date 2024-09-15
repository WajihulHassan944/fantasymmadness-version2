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
    maxRounds: '',
    matchCategoryTwo:'',
  });
  const [buttonText, setButtonText] = useState('Add Match');  // State for button text
  const [displayCategory, setDisplayCategory] = useState('boxing');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
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
        matchCategoryTwo: categoryTwo
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      formData.matchType === 'LIVE'
        ? 'https://fantasymmadness-game-server-three.vercel.app/addMatch'
        : 'https://fantasymmadness-game-server-three.vercel.app/addShadow';

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

      data.append('matchDate', formData.matchDate);
      data.append('matchType', formData.matchType);
    
      data.append('matchTime', formData.matchTime);
      data.append('matchTokens', formData.matchTokens);
      data.append('pot', formData.pot);
    

    setButtonText('Saving, please wait...');  // Update button text

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        alert('Match added successfully!');
        window.location.reload();
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

  return (
    <div className='addNewMatch'>
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
    </div>
  );
};

export default AddNewMatch;
