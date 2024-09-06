import React, { useState } from 'react';
import Logo from "../../Assets/logo.png";
import Logo1 from "../../Assets/FA.png";
import Logo2 from "../../Assets/FB.png";
import { useSelector } from 'react-redux';



const AffiliateAddNewMatch = () => {
  const [formData, setFormData] = useState({
    matchCategory: 'boxing',
    matchName: '',
    matchFighterA: '',
    matchFighterB: '',
    matchDescription: '',
    matchDate: '',
    matchTime: '',
    matchTokens: '',
    affiliateId: '',
    matchBy: 'affiliate',
    matchType: 'SHADOW',
    pot: '',
    profit: '',
    amountOverPotBudget: '',
    fighterAImage: null,         // For the file object of Fighter A's image
    fighterAImagePreview: null,  // For the preview URL of Fighter A's image
    fighterBImage: null,         // For the file object of Fighter B's image
    fighterBImagePreview: null,  // For the preview URL of Fighter B's image
});

      const [buttonText, setButtonText] = useState('Create');  // State for button text
    
  const affiliate = useSelector((state) => state.affiliateAuth.userAffiliate);
 
  if (!affiliate) {
    return <div>Loading...</div>;
  }
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const file = files ? files[0] : null;
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: file || value, // Handle both file and text inputs
      ...(file && { [`${name}Preview`]: URL.createObjectURL(file) }), // Only set preview URL if it's a file
    }));
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
  data.append('matchDate', formData.matchDate);
  data.append('matchTime', formData.matchTime);
  data.append('matchTokens', formData.matchTokens);
  data.append('matchType', formData.matchType);
  data.append('pot', formData.pot);
  data.append('fighterAImage', formData.fighterAImage);
  data.append('fighterBImage', formData.fighterBImage);
  
  data.append('affiliateId', affiliate._id);
  data.append('matchBy', formData.matchBy);
  data.append('profit', formData.profit);
  data.append('amountOverPotBudget', formData.amountOverPotBudget);
  

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
       
       <div className='addNewMatch' style={{marginLeft:'0', width:'100%', flexDirection:'column'}}>
       <div className='member-header' style={{marginBottom:'20px'}}>
          <div className='member-header-image'>
            <img src={affiliate.profileUrl} alt="Logo" />
          </div>
          <h3><span className='toRemove'>Affiliate Name:</span> {affiliate.firstName} {affiliate.lastName}</h3>
          <h3>Balance: -</h3>
        </div>
      
      
      
      
          <div className='registerCard' style={{maxWidth:'700px', marginTop:'10px'}}>
            <h1>Create a promo fight</h1>
    
            <form >
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
                  <label>Public Fight Title <span>*</span></label>
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
                  <label>Public Fight Description <span>*</span></label>
                  <textarea name='matchDescription' style={{ border: '3px solid #ccc' }} value={formData.matchDescription} onChange={handleChange} />
                </div>
              </div>
    
              <div className='input-wrap-one'>
                <div className='input-group'>
                  <label>Amount over pot budget <span>*</span></label>
                  <input type='text' name='amountOverPotBudget' value={formData.amountOverPotBudget} onChange={handleChange} />
                </div>
                <div className='input-group'>
                  <label>Fight Date <span>*</span></label>
                  <input type='date' name='matchDate' value={formData.matchDate} onChange={handleChange} />
                </div>
              </div>
    

              <div className='input-wrap-one specialDivInputs'>
  <div className='input-group special-input-group'>
    <img src={formData.fighterAImagePreview ? formData.fighterAImagePreview : Logo1} alt="Fighter A" />
  </div>
  <div className='input-group special-input-group'>
    <img src={formData.fighterBImagePreview ? formData.fighterBImagePreview : Logo2} alt="Fighter B" />
  </div>
</div>




              <div className='input-wrap-one'>
                <div className='input-group'>
                  <label>Fighter A Image <span>*</span></label>
                  <input type='file' name='fighterAImage' onChange={handleChange} />
                </div>
                <div className='input-group'>
                  <label>Fighter B Image <span>*</span></label>
                  <input type='file' name='fighterBImage' onChange={handleChange} />
                </div>
              </div>


              <div className='input-wrap-one'>
                <div className='input-group' style={{flexBasis:'100%', margin:'10px 0'}}>
                  <label style={{color:'yellow'}}>Note - You will need 70 players in order for this fight to start.
                  If the budget is not reached by the start time, the fight will not startand tokens willbe returned to members wallets. </label>
                </div>
              </div>



              <div className='input-wrap-one'>
                <div className='input-group'>
                  <label>Fight time <span>*</span></label>
                  <input type='time' name='matchTime' value={formData.matchTime} onChange={handleChange} />
                </div>
                <div className='input-group'>
                  <label>Player Buy in (Tokens) <span>*</span></label>
                  <input type='number' name='matchTokens' value={formData.matchTokens} onChange={handleChange} />
                </div>
              </div>
    
              <div className='input-wrap-one'>
                <div className='input-group'>
                  <label>Fight <span>*</span></label>
                  <select name='matchType' value={formData.matchType} onChange={handleChange}>
                    <option value="SHADOW">SHADOW</option>
                  </select>
                </div>
                <div className='input-group'>
                  <label>POT - Winner Award <span>*</span></label>
                  <input type='number' name='pot' value={formData.pot} onChange={handleChange} />
                </div>
              </div>
    
              <div className='input-wrap-one'>
                
                <div className='input-group'>
                  <label>Profit <span>*</span></label>
                  <input type='number' name='profit' value={formData.profit} onChange={handleChange} />
                </div>
              </div>
              <button type="submit" className='btn-grad' style={{ width: '50%' }} onClick={handleSubmit}>{buttonText}</button>
            </form>
          </div>
        </div>
      );
    };
    

export default AffiliateAddNewMatch
