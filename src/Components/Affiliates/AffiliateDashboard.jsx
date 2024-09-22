import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../../Redux/matchSlice';
import "../YourFights/YourFights.css";
import AffiliateAddNewMatch from './AffiliateAddNewMatch';
import AffiliateMatchDetails from './AffiliateMatchDetails';

const AffiliateDashboard = () => {
  const dispatch = useDispatch();
  
  const matches = useSelector((state) => state.matches.data);
  const matchStatus = useSelector((state) => state.matches.status);
  const [shadowMatchId, setShadowMatchId] = useState(null);
  const [promoMatchDetails, setPromoMatchDetails] = useState({ matchId: null, affiliateId: null, isBlurred:null });
 const affiliate = useSelector((state) => state.affiliateAuth.userAffiliate);
  const [promoMatches, setPromoMatches] = useState([]);
  const [users, setUsers] = useState([]); 

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

  useEffect(() => {
    if (matchStatus === 'idle') {
      dispatch(fetchMatches());
    }
  }, [matchStatus, dispatch]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersResponse = await fetch("https://fantasymmadness-game-server-three.vercel.app/users");
      const usersData = await usersResponse.json();
      setUsers(usersData);
    };
    
    fetchUsers();
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
    setPromoMatchDetails({ matchId, affiliateId, isBlurred }); // Set the selected match ID, affiliate ID, and isBlurred status
  };
  
  if (promoMatchDetails.matchId) {
    return (
      <AffiliateMatchDetails
        matchId={promoMatchDetails.matchId}
        affiliateId={promoMatchDetails.affiliateId}
        isBlurred={promoMatchDetails.isBlurred}
      />
    );
  }
  const today = new Date();
  const currentTime = today.getTime();

  const promoMatchesWithBlur = promoMatches.map((promoMatch) => {
    const matchInList = matches.find(match => match.shadowFightId === promoMatch._id);
    
    if (matchInList) {
      const usersJoinedIds = affiliate.usersJoined.map(user => user.userId);
      const eligibleUsers = users.filter(user => usersJoinedIds.includes(user._id) && parseInt(user.tokens, 10) >= matchInList.matchTokens);
      const requiredUsers = matchInList.pot / matchInList.matchTokens;
      const isBlurred = eligibleUsers.length < requiredUsers;
      return { ...promoMatch, blurred: isBlurred };
    }
    
    return promoMatch;
  });

  return (
    <div className='userdashboard yourFightsWrapper'>
      <div className='member-header' style={{ marginBottom: '20px' }}>
        <div className='member-header-image'>
          <img src={affiliate.profileUrl} alt="Logo" />
        </div>
        <h3><span className='toRemove'>Affiliate Name:</span>{affiliate.firstName} {affiliate.lastName}</h3>
        <h3>Balance: --</h3>
      </div>

      <div className='fightsWrap'>
        <div className='completedFights fightscontainer'>
          <h1 className='fightsheadingtwo'>ALL SHADOW FIGHTS</h1>
          {promoMatchesWithBlur && promoMatchesWithBlur
            .filter(match => 
              !match.AffiliateIds.some(affiliateObj => affiliateObj.AffiliateId === affiliate._id.toString())
            )
            .map((match, index) => (
              <div className="fightItem" key={index} onClick={() => handleShadowMatchClick(match._id)}>
                <div className={`fightersImages  blurred`}>
                  <div className='fighterOne'>
                    <img src={match.fighterAImage} alt={match.matchFighterA} />
                  </div>
                  <div className='fighterTwo'>
                    <img src={match.fighterBImage} alt={match.matchFighterB} />
                  </div>
                </div>
                <div className='fightItemOne'>
                  <div className={`transformed-div blurred`}>
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
          {promoMatchesWithBlur && promoMatchesWithBlur
            .filter(match => 
              match.AffiliateIds.some(affiliateObj => affiliateObj.AffiliateId === affiliate._id.toString())
            )
            .map((match, index) => (
              <div className="fightItem" key={index} onClick={() => handlePromoMatchClick(match._id, affiliate._id, match.blurred)}>
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
