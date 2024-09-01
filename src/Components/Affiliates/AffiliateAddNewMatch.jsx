import React, { useState } from 'react';
import Logo from "../../Assets/logo.png";
import Logo1 from "../../Assets/FA.png";
import Logo2 from "../../Assets/FB.png";
const AffiliateAddNewMatch = () => {
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
      const [buttonText, setButtonText] = useState('Create');  // State for button text
    
      const handleChange = (e) => {
        const { name, value, files } = e.target;
        const file = files ? files[0] : null;
        
        setFormData({
          ...formData,
          [name]: file ? URL.createObjectURL(file) : value,
        });
      };
      
    console.log(formData);
    
      return (
       
       <div className='addNewMatch' style={{marginLeft:'0', width:'100%', flexDirection:'column'}}>
       <div className='member-header' style={{marginBottom:'20px'}}>
          <div className='member-header-image'>
            <img src={Logo} alt="Logo" />
          </div>
          <h3><span className='toRemove'>Affiliate Name:</span> Wajih</h3>
          <h3>Balance: $2500</h3>
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
                  <input type='text' name='matchVideoUrl' value={formData.matchVideoUrl} onChange={handleChange} />
                </div>
                <div className='input-group'>
                  <label>Fight Date <span>*</span></label>
                  <input type='date' name='matchDate' value={formData.matchDate} onChange={handleChange} />
                </div>
              </div>
    

              <div className='input-wrap-one specialDivInputs'>
        <div className='input-group special-input-group'>
          <img src={formData.fighterAImage ? formData.fighterAImage : Logo1} alt="Fighter A" />
        </div>
        <div className='input-group special-input-group'>
          <img src={formData.fighterBImage ? formData.fighterBImage : Logo2} alt="Fighter B" />
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
                  <input type='number' name='pot' value={formData.pot} onChange={handleChange} />
                </div>
              </div>
              <button type="submit" className='btn-grad' style={{ width: '50%' }}>{buttonText}</button>
            </form>
          </div>
        </div>
      );
    };
    

export default AffiliateAddNewMatch
