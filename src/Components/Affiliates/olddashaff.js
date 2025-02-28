import React, { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import "./AffiliatedashboardNew.css";
import AffiliateAddNewMatch from './AffiliateAddNewMatch';
import AffiliateMatchDetails from './AffiliateMatchDetails';
import AffiliateHeadingBackground from "../../Assets/affiliateDashboard/ten.png"
import Fighter from "../../Assets/affiliateDashboard/elevenu.png";

const AffiliateDashboard = () => {
  const [shadowMatchId, setShadowMatchId] = useState(null);
  const [promoMatchDetails, setPromoMatchDetails] = useState({ matchId: null, affiliateId: null });
 const affiliate = useSelector((state) => state.affiliateAuth.userAffiliate);
  const [promoMatches, setPromoMatches] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  useEffect(() => {
    document.body.setAttribute('data-url', window.location.pathname);
  }, []);
  
  useEffect(() => {
    if (showPopup) {
      // Fetch users from the API
      fetch("https://fantasymmadness-game-server-three.vercel.app/users")
        .then((response) => response.json())
        .then((data) => {
          const matchedUsers = affiliate.usersJoined.map((affiliateUser) => {
            const matchedUser = data.find(
              (user) => user._id === affiliateUser.userId
            );
            return {
              ...matchedUser,
              joinedAt: affiliateUser.joinedAt,
            };
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
    return (
      <>
        <i
          className="fa fa-arrow-circle-left dashboard-arrow-circle"
          aria-hidden="true"
          onClick={() => setShadowMatchId(null)} // Go back to the previous component
        ></i>
        <AffiliateAddNewMatch matchId={shadowMatchId} />
      </>
    );
  }
  
  const handlePromoMatchClick = (matchId, affiliateId, isBlurred) => {
    setPromoMatchDetails({ matchId, affiliateId }); // Set the selected match ID, affiliate ID, and isBlurred status
  };
  
  if (promoMatchDetails.matchId) {
    return (
      <>
        <i
          className="fa fa-arrow-circle-left dashboard-arrow-circle"
          aria-hidden="true"
          onClick={() => setPromoMatchDetails({})} // Go back to the previous component
        ></i>
        <AffiliateMatchDetails
          matchId={promoMatchDetails.matchId}
          affiliateId={promoMatchDetails.affiliateId}
        />
      </>
    );
  }
  


<div className='userdashboard yourFightsWrapper'>
      <div className='member-header' style={{ position:'fixed', zIndex:'99999' }}>
        <div className='member-header-image'>
          <img src={affiliate.profileUrl} alt="Logo" />
        </div>
        <h3><span className='toRemove'>Affiliate Name:</span>{affiliate.firstName} {affiliate.lastName}</h3>
        <h3 style={{ cursor: 'pointer' }} onClick={togglePopup}>
  Users <span className="toRemove">in my League</span> : {affiliate.usersJoined.length}
</h3>
{showPopup && (
  <div className="popupUsersJoined">
    <div className="popup-content">
      <h3>Users in your League</h3>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Joined At</th>
          </tr>
        </thead>
        <tbody>
          {userDetails.map((user, index) => (
            <tr key={index}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{new Date(user.joinedAt).toLocaleDateString()}</td> {/* Format the joinedAt date */}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={togglePopup}>Close</button>
    </div>
  </div>
)}
  </div>

      <div className='fightsWrap myspecialpromotion'>
        <div className='completedFights fightscontainer fixedContainer'>
          <h1 className='fightsheadingtwo fixedShadowHead'>ALL SHADOW FIGHTS</h1>
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
                    <h1 className='transformedFighterNames'>{match.matchFighterA} -VS- {match.matchFighterB}</h1>
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

        <div className='pendingFights fightscontainer fixedContainer'>
          <h1 className='fightsheadingthree fixedShadowHead'>Your Promotion Fights</h1>
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
                    <h1 className='transformedFighterNames'>{match.matchFighterA} -VS- {match.matchFighterB}</h1>
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
