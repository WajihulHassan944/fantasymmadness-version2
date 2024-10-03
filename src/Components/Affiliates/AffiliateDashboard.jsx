import React, { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import { fetchMatches } from '../../Redux/matchSlice';
import "../YourFights/YourFights.css";
import AffiliateAddNewMatch from './AffiliateAddNewMatch';
import AffiliateMatchDetails from './AffiliateMatchDetails';

const AffiliateDashboard = () => {
  const [shadowMatchId, setShadowMatchId] = useState(null);
  const [promoMatchDetails, setPromoMatchDetails] = useState({ matchId: null, affiliateId: null });
 const affiliate = useSelector((state) => state.affiliateAuth.userAffiliate);
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


  const promoMatchIds = promoMatches.map((promoMatch) => promoMatch._id);

  if (!affiliate) {
    return <div>Loading...</div>;
  }

  const handleShadowMatchClick = (matchId) => {
    setShadowMatchId(matchId); // Set the selected match ID
  };

  if (shadowMatchId) {
    return <AffiliateAddNewMatch matchId={shadowMatchId} />;
  }

  const handlePromoMatchClick = (matchId, affiliateId, isBlurred) => {
    setPromoMatchDetails({ matchId, affiliateId }); // Set the selected match ID, affiliate ID, and isBlurred status
  };
  
  if (promoMatchDetails.matchId) {
    return (
      <AffiliateMatchDetails
        matchId={promoMatchDetails.matchId}
        affiliateId={promoMatchDetails.affiliateId}
      />
    );
  }


  return (
    <div className='userdashboard yourFightsWrapper'>
      <div className='member-header' style={{ marginBottom: '20px' }}>
        <div className='member-header-image'>
          <img src={affiliate.profileUrl} alt="Logo" />
        </div>
        <h3><span className='toRemove'>Affiliate Name:</span>{affiliate.firstName} {affiliate.lastName}</h3>
        <h3>Users <span className="toRemove"> in my League</span> : {affiliate.usersJoined.length}</h3>
      </div>

      <div className='fightsWrap myspecialpromotion'>
        <div className='completedFights fightscontainer'>
          <h1 className='fightsheadingtwo'>ALL SHADOW FIGHTS</h1>
          {promoMatches && promoMatches
            .filter(match => 
              !match.AffiliateIds.some(affiliateObj => affiliateObj.AffiliateId === affiliate._id.toString())
            )
            .map((match, index) => (
              <div className="fightItem" key={index} onClick={() => handleShadowMatchClick(match._id)}>
                <div className={`fightersImages`}>
                  <div className='fighterOne'>
                    <img src={match.fighterAImage} alt={match.matchFighterA} />
                  </div>
                  <div className='fighterTwo'>
                    <img src={match.fighterBImage} alt={match.matchFighterB} />
                  </div>
                </div>
                <div className='fightItemOne'>
                  <div className={`transformed-div`}>
                    <h1>{match.matchFighterA} -VS- {match.matchFighterB}</h1>
                  </div>
                  <div className="transformed-div-two">
                    <div className='transformed-div-two-partOne'>
                      <h1>Max Rounds {match.maxRounds}</h1>
                    </div>
                    <div className='transformed-div-two-partTwo'>
                      <p>{match.matchType} &nbsp;
                        {match.matchCategoryTwo ? match.matchCategoryTwo : match.matchCategory}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className='pendingFights fightscontainer'>
          <h1 className='fightsheadingthree'>Your Promotion Fights</h1>
          {promoMatches && promoMatches
            .filter(match => 
              match.AffiliateIds.some(affiliateObj => affiliateObj.AffiliateId === affiliate._id.toString())
            )
            .map((match, index) => (
              <div className="fightItem" key={index} onClick={() => handlePromoMatchClick(match._id, affiliate._id)}>
                <div className={`fightersImages ${match.blurred ? 'blurred' : ''}`}>
                  <div className='fighterOne'>
                    <img src={match.fighterAImage} alt={match.matchFighterA} />
                  </div>
                  <div className='fighterTwo'>
                    <img src={match.fighterBImage} alt={match.matchFighterB} />
                  </div>
                </div>
                <div className='fightItemOne'>
                  <div className={`transformed-div ${match.blurred ? 'blurred' : ''}`}>
                    <h1>{match.matchFighterA} -VS- {match.matchFighterB}</h1>
                  </div>
                  <div className="transformed-div-two">
                    <div className='transformed-div-two-partOne'>
                      <h1>Max Rounds {match.maxRounds}</h1>
                    </div>
                    <div className='transformed-div-two-partTwo'>
                      <p>{match.matchType} &nbsp;
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
  );
}

export default AffiliateDashboard;
