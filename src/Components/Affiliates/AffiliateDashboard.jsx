import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../../Redux/matchSlice';

import "../YourFights/YourFights.css";
import Logo from "../../Assets/fighterOne.png";
import AffiliateAddNewMatch from './AffiliateAddNewMatch';
import AffiliateFightApproved from './AffiliateFightApproved';
import AffiliateMatchDetails from './AffiliateMatchDetails';
const AffiliateDashboard = () => {
  
  const [shadowMatchId, setShadowMatchId] = useState(null);
  const [promoMatchId, setPromoMatchId] = useState(null);
  
  const affiliate = useSelector((state) => state.affiliateAuth.userAffiliate);
 
  const dispatch = useDispatch();
  
  const matches = useSelector((state) => state.matches.data);
  const matchStatus = useSelector((state) => state.matches.status);
 
  const [promoMatches, setPromoMatches] = useState([]); 

  useEffect(() => {
    const fetchPromoMatches = async () => {
      try {
        const response = await fetch('https://fantasymmadness-game-server-three.vercel.app/promoMatches');
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


  useEffect(() => {
    if (matchStatus === 'idle') {
      dispatch(fetchMatches());
    }
  }, [matchStatus, dispatch]);
  
  const promoMatchIds = promoMatches.map((promoMatch) => promoMatch.matchId);

  if (!affiliate) {
    return <div>Loading...</div>;
  }

  const formatTime = (timeString) => {
    const [hour, minute] = timeString.split(':');
    const hours = parseInt(hour);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHour = hours % 12 || 12;  // Convert to 12-hour format
    return `${formattedHour}:${minute} ${period}`;
  };
  

  const handleShadowMatchClick = (matchId) => {
    setShadowMatchId(matchId); // Set the selected match ID
  };

  const handlePromoMatchClick = (matchId) => {
    setPromoMatchId(matchId); // Set the selected match ID
  };

if(shadowMatchId){
  const match = matches.find((m) => m._id === shadowMatchId);
  if (match && match.matchStatus === 'Ongoing') {
    alert("Match has finished!!!");
  } else if (match && match.matchStatus === 'Finished') {
    return <AffiliateAddNewMatch matchId={shadowMatchId} />;
  }
}



if(promoMatchId){
    return <AffiliateMatchDetails matchId={promoMatchId} />;
  
}








    return (
      <div className='userdashboard yourFightsWrapper'>
        <div className='member-header' style={{marginBottom:'20px'}}>
          <div className='member-header-image'>
            <img src={affiliate.profileUrl} alt="Logo" />
          </div>
          <h3><span className='toRemove'>Affiliate Name:</span>{affiliate.firstName} {affiliate.lastName}</h3>
          <h3>Balance: --</h3>
        </div>
      
      
  
  <div className='fightsWrap'>
  

  <div className='completedFights fightscontainer'>
  <h1 className='fightsheadingtwo'>ALL SHADOW FIGHTS</h1>

  {matches && matches
    .filter(match => match.matchType === "SHADOW")  // Filter for SHADOW matches
    .filter(match => !promoMatchIds.includes(match._id))  // Exclude matches found in promoMatches
     .map((match, index) => (
      <div className="fightItem" key={index} onClick={() => handleShadowMatchClick(match._id)}>
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
              <h1>{formatTime(match.matchTime)} est</h1> {/* Format time here */}
            </div>
            <div className='transformed-div-two-partTwo'>
              <p >
                {new Date(match.matchDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
  ))}
</div>

  
  
  <div className='pendingFights fightscontainer'>
    <h1 className='fightsheadingthree'>Your Promotion Fights</h1>
  
    {matches && matches
  .filter(match => match.matchType === "SHADOW")  // Filter for SHADOW matches
  .filter(match => promoMatchIds.includes(match._id))  // Include matches found in promoMatches
  .map((match, index) => {
    // Find the corresponding promoMatch for this match
    const promoMatch = promoMatches.find(promo => promo.matchId === match._id);

    return (
      <div className="fightItem" key={index} onClick={() => handlePromoMatchClick(match._id)}>
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
              <h1>{formatTime(match.matchTime)} est</h1> {/* Format time here */}
            </div>
            <div className='transformed-div-two-partTwo'>
              <p>
                {new Date(match.matchDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        
        <div className='fightItemTwo'>
          <div className="transformed-three">
            {/* Render dynamic data from promoMatch */}
            <div className='transformedDivBox' style={{width:"90px"}}>Tokens: {promoMatch?.matchTokens || 'N/A'}</div>
            <div className='transformedDivBox' style={{width:"90px"}}>Pot: {promoMatch?.pot || 'N/A'}</div>
            <div className='transformedDivBox' style={{width:"90px"}}>Profit: {promoMatch?.profit || 'N/A'}</div>
          </div>
          <div className="transformed-div-four">
            <h1>Budget</h1>
            <p>{promoMatch?.amountOverPotBudget || 'N/A'}</p>
          </div>
        </div>
      </div>
    );
  })}

        
  </div>
  
  
  
  
  
  
  
  
  
  
  
  
  </div>
      </div>
  
    )
  }
  

export default AffiliateDashboard
