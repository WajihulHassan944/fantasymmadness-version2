import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const AffiliateAddNewMatch = ({ matchId }) => {

  const [formData, setFormData] = useState({
    shadowFightId: '',
    matchTokens: '',
    affiliateId: '',
    pot: '',
    profit: '',
    amountOverPotBudget: '',
    matchDate: '',
    matchTime: '',

  });

  const [promoMatches, setPromoMatches] = useState([]); 
    
  useEffect(() => {
    const fetchPromoMatches = async () => {
      try {
        const response = await fetch('https://fantasymmadness-game-server-three.vercel.app/shadow');
        if (!response.ok) {
          throw new Error('Failed to fetch promo matches');
        }
        const data = await response.json();
        setPromoMatches(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPromoMatches();
  }, []);


  const [buttonText, setButtonText] = useState('Create');
  const affiliate = useSelector((state) => state.affiliateAuth.userAffiliate);
  const promoDetails = promoMatches.find((m) => m._id === matchId);
if(!promoDetails){
  return <p>Loading...</p>;
}

  if (!affiliate) {
    return <div>Loading...</div>;
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    const numericFields = ['matchTokens', 'pot', 'profit', 'amountOverPotBudget'];
    const dateFields = ['matchDate', 'matchTime'];
  
    let newValue;
  
    if (numericFields.includes(name)) {
      newValue = parseFloat(value) || 0;
    } else if (dateFields.includes(name)) {
      newValue = value; // Keep date and time as string
    } else {
      newValue = value;
    }
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const url = 'https://fantasymmadness-game-server-three.vercel.app/addMatch';
  
    const matchDetails = promoMatches.find((m) => m._id === matchId);
    if (!matchDetails) {
      alert('Match not found!');
      return;
    }
  
    const data = new FormData();
    data.append('matchTokens', formData.matchTokens);
    data.append('shadowFightId', matchDetails._id);
    data.append('affiliateId', affiliate._id);
    data.append('pot', formData.pot);
    data.append('profit', formData.profit);
    data.append('amountOverPotBudget', formData.amountOverPotBudget);
    data.append('matchDate', formData.matchDate);
    data.append('matchTime', formData.matchTime);
  
    // Append image URLs directly if available
    data.append('fighterAImageUrl', matchDetails.fighterAImage);
    data.append('fighterBImageUrl', matchDetails.fighterBImage);
  
    // Append other match details
    data.append('matchCategory', matchDetails.matchCategory);
    data.append('matchName', matchDetails.matchName);
    data.append('matchFighterA', matchDetails.matchFighterA);
    data.append('matchFighterB', matchDetails.matchFighterB);
    data.append('matchDescription', matchDetails.matchDescription);
    data.append('matchVideoUrl', matchDetails.matchVideoUrl);
    data.append('matchType', 'SHADOW');
    data.append('maxRounds', matchDetails.maxRounds);
  
    setButtonText('Saving, please wait...');
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: data,
      });
  
      if (response.ok) {
        const responseData = await response.json();
        alert('Match added successfully!');
        console.log(responseData.data);
        window.location.reload();
      } else {
        alert('Failed to add match.');
      }
    } catch (error) {
      console.error('Error adding match:', error);
      window.location.reload();

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
              <input type='text' name='matchName' value={promoDetails.matchName} disabled style={{ background: '#fff' }} />
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
                  <label>Match Date <span>*</span></label>
                  <input type='date' name='matchDate' value={formData.matchDate} onChange={handleChange} />
                </div>
                <div className='input-group'>
                  <label>Match time <span>*</span></label>
                  <input type='time' name='matchTime' value={formData.matchTime} onChange={handleChange} />
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