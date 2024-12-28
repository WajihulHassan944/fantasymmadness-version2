import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import "../YourFights/YourFights.css";
import PromoTwo from './PromoTwo';

const AffiliateAllPromos = () => {
    const [promoMatchDetails, setPromoMatchDetails] = useState({ matchId: null, affiliateId: null });
    const { affiliateName } = useParams();

    const [affiliate, setAffiliate] = useState(null);
 
    const [promoMatches, setPromoMatches] = useState([]);
     

    useEffect(() => {
        const fetchAffiliateData = async () => {
          try {
            console.log("Fetching affiliate data for fullName:", affiliateName);
            const response = await fetch(
              `https://fantasymmadness-game-server-three.vercel.app/affiliateByName?fullName=${encodeURIComponent(affiliateName)}`
            );
            console.log("Affiliate API response status:", response.status);
    
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const affiliateData = await response.json();
            console.log("Fetched affiliate data:", affiliateData);
            setAffiliate(affiliateData);
          } catch (error) {
            console.error('Error fetching affiliate data:', error);
          }
        };
    
        if (affiliateName) {
          fetchAffiliateData();
        } else {
          console.error("Full name is not available");
        }
      }, [affiliateName]);
    


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
  
    
    
if(!affiliate){
    return <p>Loading...</p>;
}
  
  const handlePromoMatchClick = (matchId, affiliateId) => {
    setPromoMatchDetails({ matchId, affiliateId }); // Set the selected match ID and affiliate ID
  };
  
  
if(promoMatchDetails.matchId){
    return <PromoTwo 
    matchId={promoMatchDetails.matchId} 
    affiliateId={promoMatchDetails.affiliateId} 
  />;
  }
  
  
  
      return (
        <div className='userdashboard yourFightsWrapper'>
          <div className='member-header' style={{marginBottom:'20px'}}>
            <div className='member-header-image'>
              <img src={affiliate.profileUrl} alt="Logo" />
            </div>
            <h3>Affiliate<span className='toRemove'> Name</span>:{affiliate.firstName} <span className='toRemove'> {affiliate.lastName}</span></h3>
            <h3>Users Joined <span className='toRemove'> League</span>: {affiliate.usersJoined.length}</h3>
            </div>
        
        
    
    <div className='fightsWrap myspecialpromotion'>
    
    
    
  <div className='pendingFights fightscontainer'>
  <h1 className='fightsheadingthree' style={{fontSize:'20px'}}>{affiliate.firstName}'s Promotion Fights</h1>
    
    {promoMatches && promoMatches
      .filter(match => 
      match.AffiliateIds.some(affiliateObj => affiliateObj.AffiliateId === affiliate._id.toString())
    ).map((match, index) => (
        <div className="fightItem" key={index} onClick={() => handlePromoMatchClick(match._id, affiliate._id)}>
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
              <h1>Max Rounds {match.maxRounds}</h1> {/* Format time here */}
              </div>
              <div className='transformed-div-two-partTwo'>
                <p >
                  {match.matchType} &nbsp;
                  {match.matchCategoryTwo ? match.matchCategoryTwo : match.matchCategory}
                </p>
              </div>
            </div>
          </div>
        </div>
    ))}
  </div>
  
    
    
    </div>
        </div>
    
      )
    }
    
  
export default AffiliateAllPromos
