import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const AffiliateAddNewMatch = ({ matchId }) => {
  const [formData, setFormData] = useState({
    matchId: '',
    matchTokens: '',
    affiliateId: '',
    pot: '',
    profit: '',
    amountOverPotBudget: '',
  });

  const matches = useSelector((state) => state.matches.data);
  const match = matches.find((m) => m._id === matchId);
  const [buttonText, setButtonText] = useState('Create');
  const affiliate = useSelector((state) => state.affiliateAuth.userAffiliate);

  if (!affiliate) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    const numericFields = ['matchTokens', 'pot', 'profit', 'amountOverPotBudget'];
    const newValue = numericFields.includes(name) ? parseFloat(value) || 0 : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'https://fantasymmadness-game-server-three.vercel.app/addPromoMatch';
    
    // Send the data as JSON
    const requestBody = {
      matchId: matchId,
      matchTokens: formData.matchTokens,
      affiliateId: affiliate._id,
      pot: formData.pot,
      profit: formData.profit,
      amountOverPotBudget: formData.amountOverPotBudget
    };

    setButtonText('Saving, please wait...');

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (response.ok) {
        alert(responseData.message);
        console.log(responseData.data);
        window.location.reload();
      } else {
        alert('Failed to add match.');
      }
    } catch (error) {
      console.error('Error adding match:', error);
      alert('An error occurred while adding the match.');
    } finally {
      setButtonText('Add Match');
    }
  };

  return (
    <div className='addNewMatch' style={{ marginLeft: '0', width: '100%', flexDirection: 'column' }}>
      <div className='member-header' style={{ marginBottom: '20px' }}>
        <div className='member-header-image'>
          <img src={affiliate.profileUrl} alt="Logo" />
        </div>
        <h3><span className='toRemove'>Affiliate Name:</span> {affiliate.firstName} {affiliate.lastName}</h3>
        <h3>Balance: -</h3>
      </div>

      <div className='registerCard' style={{ maxWidth: '700px', marginTop: '10px' }}>
        <h1>Create a promo for a fight</h1>

        <form>
          <div className='input-wrap-one'>
            <div className='input-group'>
              <label>Fight Name</label>
              <input type='text' name='matchName' value={match.matchName} disabled style={{ background: '#fff' }} />
            </div>
            <div className='input-group'>
              <label>Profit <span>*</span></label>
              <input type='number' name='profit' value={formData.profit} onChange={handleChange} />
            </div>
          </div>

          <div className='input-wrap-one'>
            <div className='input-group'>
              <label>Amount over pot budget <span>*</span></label>
              <input type='number' name='amountOverPotBudget' value={formData.amountOverPotBudget} onChange={handleChange} />
            </div>
            <div className='input-group'>
              <label>Player Buy in (Tokens) <span>*</span></label>
              <input type='number' name='matchTokens' value={formData.matchTokens} onChange={handleChange} />
            </div>
          </div>

          <div className='input-wrap-one'>
            <div className='input-group' style={{ flexBasis: '100%', margin: '10px 0' }}>
              <label style={{ color: 'yellow' }}>Note - You will need 70 players in order for this fight to start. If the budget is not reached by the start time, the fight will not start and tokens will be returned to members' wallets.</label>
            </div>
          </div>

          <div className='input-wrap-one'>
            <div className='input-group'>
              <label>POT - Winner Award <span>*</span></label>
              <input type='number' name='pot' value={formData.pot} onChange={handleChange} />
            </div>
          </div>

          <button type="submit" className='btn-grad' style={{ width: '50%' }} onClick={handleSubmit}>{buttonText}</button>
        </form>
      </div>
    </div>
  );
};

export default AffiliateAddNewMatch;
