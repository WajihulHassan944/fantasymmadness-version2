import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import FightLeaderboard from '../GlobalLeaderboard/FightLeaderboard';
import AffiliateFightLeaderboard from './AffiliateFightLeaderboard';
import { fetchMatches } from '../../Redux/matchSlice';

const AffiliateMatchDetails = ({matchId, affiliateId}) => {
  
  const dispatch = useDispatch();
  const affiliate = useSelector((state) => state.affiliateAuth.userAffiliate);
  const matches = useSelector((state) => state.matches.data);
  const matchStatus = useSelector((state) => state.matches.status);
  const match = matches.find((m) => m.shadowFightId === matchId && m.affiliateId === affiliateId);
  const [navigateDashboard, setNavigateToDash] = useState(null);
  
  useEffect(() => {
    if (matchStatus === 'idle') {
      dispatch(fetchMatches());
    }
  }, [matchStatus, dispatch]);


  if(!match){
    return <p>load...</p>;
  }
  
  if (!affiliate) {
    return <div>Loading...</div>;
  }
  const handleDeleteFight = async (id) => {
    try {
      const response = await fetch(`https://fantasymmadness-game-server-three.vercel.app/api/matches/${id}?affiliateId=${affiliateId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        alert("Promotion Deleted");
        window.location.reload();
      } else {
        console.error('Failed to delete:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting match:', error);
    }
  };
  
const handleDashboardOpening = (id) =>{
  setNavigateToDash(id);
}

if(navigateDashboard){
  return <AffiliateFightLeaderboard matchId={navigateDashboard} />
}

const copyToClipboard = () => {
  if (match && affiliate) {
    const fullName = `${affiliate.firstName} ${affiliate.lastName}`; // Combine first and last name
    const encodedMatchName = encodeURIComponent(match.matchName);  // Encode matchName
    const encodedFullName = encodeURIComponent(fullName);  // Encode fullName
    
    const url = `https://fantasymmadness.com/shadow/${encodedMatchName}/${encodedFullName}`;
    
    navigator.clipboard.writeText(url)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
      });
  }
};


    return (
        <div className='fightDetails' style={{paddingBottom:'50px'}}>
          
          
          <div className='member-header' style={{marginBottom:'30px'}}>
            <div className='member-header-image'>
              <img src={affiliate.profileUrl} alt="Logo" />
            </div>
            <h3>Affiliate <span className="toRemove">Name </span>- {affiliate.firstName} {affiliate.lastName}</h3>
            <h3>Balance: -</h3>
          </div>
    
    
    
    <div className='fightDetailsContainer'>
            <h1 className='fightDetailsContainerFirstHeading'>Fight: <span>{match.matchName}</span></h1>
    
            <div className='fightersImagesInFightDetails'>
  <div className='imgWrapFights'>
    <img src={match.fighterAImage}  alt="Fighter A" />
  </div>
  <h1>VS</h1>
  <div className='imgWrapFights'>
    <img src={match.fighterBImage}  alt="Fighter B" />
  </div>
</div>

            
            <div className='fightDetailsPot'>
                    <h1 style={{background:'#e90000', padding:'5px 10px', fontSize:'22px'}}>This fight is approved.</h1>
            </div>

      {/*      <div className='fightDetailsPot'>
    <h1 style={{color:'#ebcd03', fontSize:'22px'}}>
      Amount over pot budget: {match.amountOverPotBudget} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      Profit: {match.profit}
    </h1>
 </div>*/}


                <h1 className='fightTypeInFightDetails' style={{fontSize:'21.5px'}}>Fight type: <span>{match.matchCategoryTwo ? match.matchCategoryTwo : match.matchCategory}</span>
                - <span style={{color:'#3fd50b'}}>{match.matchType} </span> - <span>{match.matchFighterA} </span> VS <span> {match.matchFighterB} </span>
                </h1>
    
                <div className='fightDetailsPot'>
                    <h1>POT :</h1>
                   
                      <p style={{color:"#38b90c"}}>{match.pot} </p>
                    
                </div>
    
                <div className='beiginningTimeFight'>
                <h1 style={{fontSize:'21.5px'}}>  {new Date(match.matchDate).toLocaleDateString()} - </h1>
                <p style={{color:"#38b90c"}}>{match.matchTime}</p>
                </div>
    


                <div className='fightDetailsPot'>
                    <h1 style={{fontSize:'21.5px'}}>Fight promotion url below <span onClick={copyToClipboard} style={{ cursor: 'pointer', color: 'blue' }}>Click to copy</span></h1>
                 </div>
                <div className='fightDetailsPot'>
                    <h1 style={{color:'#8abafe', fontSize:'21.5px'}} className='specialtextmine'>fantasymmadness.com/shadow/{match.matchName}/{affiliate.firstName} {affiliate.lastName}</h1>
                </div>

<div style={{width:'100%', display:'flex', gap:'20px', flexWrap:'wrap', justifyContent:'center', alignItems:'center'}}>
                <button className='btn-grad promobtn'  onClick={() => handleDeleteFight(match._id)}>Delete Fight</button>
                <button className='btn-grad promobtn'  onClick={() => handleDashboardOpening(match._id)}>Dashboard</button>
                </div>
    </div>
        </div>
      )
    }
    
export default AffiliateMatchDetails
