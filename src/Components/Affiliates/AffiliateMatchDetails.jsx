import React from 'react'
import Logoimage from "../../Assets/myimg.jpg";
import FighterOne from "../../Assets/fighterOne.png";
import FightTwo from "../../Assets/fighterTwo.png";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import FightLeaderboard from '../GlobalLeaderboard/FightLeaderboard';
import AffiliateFightLeaderboard from './AffiliateFightLeaderboard';

const AffiliateMatchDetails = ({matchId}) => {


  const affiliate = useSelector((state) => state.affiliateAuth.userAffiliate);
  const matches = useSelector((state) => state.matches.data);
  const match = matches.find((m) => m._id === matchId);
 
  
  const [promoMatches, setPromoMatches] = useState([]); 
  const [promoMatchId, setPromoMatchId] = useState(null);
  const [navigateDashboard, setNavigateToDash] = useState(null);
  useEffect(() => {
    const fetchPromoMatches = async () => {
      try {
        const response = await fetch('https://fantasymmadness-game-server-three.vercel.app/promoMatches');
        if (!response.ok) {
          throw new Error('Failed to fetch promo matches');
        }
        const data = await response.json();
         
        const filteredMatches = data.filter(m => m.matchId === matchId);

        setPromoMatches(filteredMatches); // set only the filtered matches
        if (filteredMatches.length > 0) {
          setPromoMatchId(filteredMatches[0]._id); // store the _id of the first match
        }
     } catch (err) {
        console.log(err);
      }
    };

    fetchPromoMatches();
  }, []);



  if (!affiliate) {
    return <div>Loading...</div>;
  }

const handleDeleteFight = async(id) => {
  try {
    const response = await fetch(`https://fantasymmadness-game-server-three.vercel.app/promofighttodelete/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert("Promotion Deleted");
    window.location.reload();
  }
  } catch (error) {
    console.error('Error deleting user:', error);
   }
}

const handleDashboardOpening = (id) =>{
  setNavigateToDash(id);
}

if(navigateDashboard){
  return <AffiliateFightLeaderboard matchId={navigateDashboard} />
}
    return (
        <div className='fightDetails'>
          
          
          <div className='member-header' style={{marginBottom:'30px'}}>
            <div className='member-header-image'>
              <img src={affiliate.profileUrl} alt="Logo" />
            </div>
            <h3>Affiliate Name - {affiliate.firstName} {affiliate.lastName}</h3>
            <h3>Balance: -</h3>
          </div>
    
    
    
    <div className='fightDetailsContainer'>
            <h1 className='fightDetailsContainerFirstHeading'>Fight: <span>{match.matchName}</span></h1>
    
            <div className='fightersImagesInFightDetails'>
                <div className='imgWrapFights'><img src={match.fighterAImage} /></div>
                <h1>VS</h1>
                <div className='imgWrapFights'><img src={match.fighterBImage} /></div>

            </div>
            
            <div className='fightDetailsPot'>
                    <h1 style={{background:'#e90000', padding:'5px 10px', fontSize:'22px'}}>This fight is approved.</h1>
            </div>

            <div className='fightDetailsPot'>
  {promoMatches.length > 0 && (
    <h1 style={{color:'#ebcd03', fontSize:'22px'}}>
      Amount over pot budget: {promoMatches[0].amountOverPotBudget} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      Profit: {promoMatches[0].profit}
    </h1>
  ) }
</div>


                <h1 className='fightTypeInFightDetails' style={{fontSize:'21.5px'}}>Fight type: <span>{match.matchCategory}</span>
                - <span style={{color:'#3fd50b'}}>{match.matchType} </span> - <span>{match.matchFighterA} </span> VS <span> {match.matchFighterB} </span>
                </h1>
    
                <div className='fightDetailsPot'>
                    <h1>POT :</h1>
                   
                    {promoMatches.length > 0 && (
                      <p style={{color:"#38b90c"}}>{promoMatches[0].pot} </p>
                    )}
                </div>
    
                <div className='beiginningTimeFight'>
                <h1 style={{fontSize:'21.5px'}}>  {new Date(match.matchDate).toLocaleDateString()} - </h1>
                <p style={{color:"#38b90c"}}>{match.matchTime}</p>
                </div>
    


                <div className='fightDetailsPot'>
                    <h1 style={{fontSize:'21.5px'}}>Fight promotion url below <span>Click to copy</span></h1>
                 </div>
                <div className='fightDetailsPot'>
                    <h1 style={{color:'#8abafe', fontSize:'21.5px'}}>https://fantasymmadness.com/affiliate/fight-title</h1>
                </div>

<div style={{width:'100%', display:'flex', gap:'20px', flexWrap:'wrap', justifyContent:'center', alignItems:'center'}}>
                <button className='btn-grad' style={{width:'14%'}} onClick={() => handleDeleteFight(promoMatchId)}>Delete Fight</button>
                <button className='btn-grad' style={{width:'14%'}} onClick={() => handleDashboardOpening(match._id)}>Dashboard</button>
                </div>
    </div>
        </div>
      )
    }
    
export default AffiliateMatchDetails
