import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./AffiliatedashboardNew.css";
import AffiliateAddNewMatch from './AffiliateAddNewMatch';
import AffiliateMatchDetails from './AffiliateMatchDetails';
import AffiliateHeadingBackground from "../../Assets/affiliateDashboard/ten.png";
import Fighter from "../../Assets/affiliateDashboard/elevenu.png";
import { fetchMatches } from '../../Redux/matchSlice';
const MAX_CARDS = 5; // Max number of fight cards to display at a time

const AffiliateDashboard = () => {
  const [shadowMatchId, setShadowMatchId] = useState(null);
  const [promoMatchDetails, setPromoMatchDetails] = useState({ matchId: null, affiliateId: null });
  const affiliate = useSelector((state) => state.affiliateAuth.userAffiliate);
  const [promoMatches, setPromoMatches] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  
  const matches = useSelector((state) => state.matches.data);
  const matchStatus = useSelector((state) => state.matches.status);
  const dispatch = useDispatch();

  const [promoStartIndex, setPromoStartIndex] = useState(0);
  const [promotedStartIndex, setPromotedStartIndex] = useState(0);

  useEffect(() => {
    if (matchStatus === 'idle') {
      dispatch(fetchMatches());
    }
  }, [matchStatus, dispatch]);

  useEffect(() => {
    if (showPopup) {
      fetch("https://fantasymmadness-game-server-three.vercel.app/users")
        .then((response) => response.json())
        .then((data) => {
          const matchedUsers = affiliate.usersJoined.map((affiliateUser) => {
            const matchedUser = data.find((user) => user._id === affiliateUser.userId);
            return { ...matchedUser, joinedAt: affiliateUser.joinedAt };
          });
          setUserDetails(matchedUsers);
        })
        .catch((error) => console.error("Error fetching users:", error));
    }
  }, [showPopup]);

  useEffect(() => {
    const fetchPromoMatches = async () => {
      try {
        const response = await fetch('https://fantasymmadness-game-server-three.vercel.app/shadow');
        if (!response.ok) throw new Error('Failed to fetch promo matches');
        const data = await response.json();
        setPromoMatches(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPromoMatches();
  }, []);

  if (!affiliate) return <div>Loading...</div>;

  const handleShadowMatchClick = (matchId) => {
    setShadowMatchId(matchId);
  };

  if (shadowMatchId) {
    return (
      <>
        <i className="fa fa-arrow-circle-left dashboard-arrow-circle" aria-hidden="true" onClick={() => setShadowMatchId(null)}></i>
        <AffiliateAddNewMatch matchId={shadowMatchId} />
      </>
    );
  }

  const handlePromoMatchClick = (matchId, affiliateId) => {
    setPromoMatchDetails({ matchId, affiliateId });
  };

  if (promoMatchDetails.matchId) {
    return (
      <>
        <i className="fa fa-arrow-circle-left dashboard-arrow-circle" aria-hidden="true" onClick={() => setPromoMatchDetails({})}></i>
        <AffiliateMatchDetails matchId={promoMatchDetails.matchId} affiliateId={promoMatchDetails.affiliateId} />
      </>
    );
  }

  const promotionFights = promoMatches.filter(match => 
    match.matchType === "SHADOW" && 
    !match.AffiliateIds.some(affiliateObj => affiliateObj.AffiliateId === affiliate._id.toString())
  );
  
  const promotedFights = promoMatches.filter(match => 
    match.AffiliateIds.some(affiliateObj => 
      affiliateObj.AffiliateId === affiliate._id.toString() && 
      matches.some(m => m._id === affiliateObj.matchId && m.matchShadowOpenStatus === "open")
    )
  );
  const handlePromoNext = () => {
    if (promoStartIndex + MAX_CARDS < promotionFights.length) {
      setPromoStartIndex(promoStartIndex + MAX_CARDS);
    }
  };

  const handlePromoPrev = () => {
    if (promoStartIndex > 0) {
      setPromoStartIndex(promoStartIndex - MAX_CARDS);
    }
  };

  const handlePromotedNext = () => {
    if (promotedStartIndex + MAX_CARDS < promotedFights.length) {
      setPromotedStartIndex(promotedStartIndex + MAX_CARDS);
    }
  };

  const handlePromotedPrev = () => {
    if (promotedStartIndex > 0) {
      setPromotedStartIndex(promotedStartIndex - MAX_CARDS);
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <div className="promotional-container-affiliate-dashboard">
        <section className="affiliate-stats-section">
          <div className="stats-cards-wrap">
            <div className="stat-card"><h1>Your Balance</h1><h2>${affiliate.tokens}</h2></div>
            <div className="stat-card"><h1>Promotion Views</h1><h2>{affiliate.totalViews}</h2></div>
            <div className="stat-card"><h1>League Members</h1><h2>{affiliate.usersJoined.length}</h2></div>
            <div className="stat-card"><h1>Total Promotions</h1><h2>{matches.filter(m => m.affiliateId === affiliate?._id).length}</h2></div>
          </div>
       
        </section>
        
        <section className="affiliate-dashboard-fights">
          <img src={Fighter} alt="fighter" className='section-fighter' />
          <div className="fights-div-promotion">
            <div className='fights-grid-affiliate'>

              {/* Promotion Fights */}
              <div className="column one">
                <div className="promotion-container">
                  <img src={AffiliateHeadingBackground} alt="Background" className="promotion-bg" />
                  <h1 className="promotion-heading">Shadow Templates</h1>
                </div>

                {promotionFights.slice(promoStartIndex, promoStartIndex + MAX_CARDS).map((match, index) => (
                  <div className='fight-card' key={index} onClick={() => handleShadowMatchClick(match._id)}>
                    <div className='fight-date'><span className='date'>{promoStartIndex + index + 1}</span></div>
                    <div className='fight-info'><h2>{match.matchFighterA.split(' ')[0]} Vs {match.matchFighterB.split(' ')[0]}</h2>
                    <p>{match.matchCategoryTwo ? match.matchCategoryTwo : match.matchCategory} | Max Rounds: {match.maxRounds}</p>
                    </div>
                  </div>
                ))}

                <div className='dashboard-backward-forward-buttons'>
                  {promoStartIndex > 0 && <i className="fa fa-chevron-left left-icon" onClick={handlePromoPrev}></i>}
                  {promoStartIndex + MAX_CARDS < promotionFights.length && <i className="fa fa-chevron-right right-icon" onClick={handlePromoNext}></i>}
                </div>
              </div>

              {/* Promoted Fights */}
              <div className="column two">
                <div className="promotion-container">
                  <img src={AffiliateHeadingBackground} alt="Background" className="promotion-bg" />
                  <h1 className="promotion-heading">Promoted Fights</h1>
                </div>

                {promotedFights.slice(promotedStartIndex, promotedStartIndex + MAX_CARDS).map((match, index) => (
                  <div className='fight-card' key={index} onClick={() => handlePromoMatchClick(match._id, affiliate._id)}>
                    <div className='fight-date'><span className='date'>{promotedStartIndex + index + 1}</span></div>
                    <div className='fight-info'><h2>{match.matchFighterA.split(' ')[0]} Vs {match.matchFighterB.split(' ')[0]}</h2>
                      <p>{match.matchCategoryTwo ? match.matchCategoryTwo : match.matchCategory} | Max Rounds: {match.maxRounds}</p>
                    </div>
                  </div>
                ))}

                <div className='dashboard-backward-forward-buttons'>
                  {promotedStartIndex > 0 && <i className="fa fa-chevron-left left-icon" onClick={handlePromotedPrev}></i>}
                  {promotedStartIndex + MAX_CARDS < promotedFights.length && <i className="fa fa-chevron-right right-icon" onClick={handlePromotedNext}></i>}
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AffiliateDashboard;
