import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMatches } from '../../Redux/matchSlice';
import AffiliateFightLeaderboard from './AffiliateFightLeaderboard';
import "./promo.css";
import background from "../../Assets/calender/two-back.jpg";

const Promo = () => {

  const dispatch = useDispatch();
  const { matchName, fullName } = useParams();
  const navigate = useNavigate();

  const [affiliate, setAffiliate] = useState(null);
  const [match, setMatch] = useState(null);
  const [navigateDashboard, setNavigateToDash] = useState(null);

  const matches = useSelector((state) => state.matches.data);
  const matchStatus = useSelector((state) => state.matches.status);
  const user = useSelector((state) => state.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (matchStatus === 'idle') {
      console.log("Fetching matches...");
      dispatch(fetchMatches());
    } else {
      console.log("Matches already fetched or fetching...");
    }
  }, [matchStatus, dispatch]);

  // Fetch affiliate data based on fullName from URL
  useEffect(() => {
    const fetchAffiliateData = async () => {
      try {
        console.log("Fetching affiliate data for fullName:", fullName);
        const response = await fetch(
          `https://fantasymmadness-game-server-three.vercel.app/affiliateByName?fullName=${encodeURIComponent(fullName)}`
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

    if (fullName) {
      fetchAffiliateData();
    } else {
      console.error("Full name is not available");
    }
  }, [fullName]);

  // Find the match associated with the affiliate
  useEffect(() => {
    if (affiliate) {
      console.log("Affiliate data available:", affiliate);
      const affiliateId = affiliate._id;
      const foundMatch = matches.find((m) => m.matchName === matchName && m.affiliateId === affiliateId);
      console.log("Found match:", foundMatch);
      setMatch(foundMatch);
    } else {
      console.log("Waiting for affiliate data...");
    }
  }, [affiliate, matches, matchName]);


  
  // Increment totalViews on component load
  useEffect(() => {
    
    const incrementViews = async () => {
      try {
        await fetch(`https://fantasymmadness-game-server-three.vercel.app/affiliate/${affiliate._id}/incrementViews`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        console.error('Error incrementing view count:', error);
      }
    };
  
    if (affiliate) {
      incrementViews();
    }
  }, [affiliate]);
  

  // Handle join league action
  const handleJoinLeague = async () => {
    if (!isAuthenticated) {
      window.open('/login', '_blank'); // Open login page in a new window
      return;
    }

    const userId = user._id;
    const userEmail = user.email;

    console.log("User attempting to join league:", userId, userEmail);

    try {
      const response = await fetch(`https://fantasymmadness-game-server-three.vercel.app/affiliate/${affiliate._id}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, userEmail }),
      });

      if (response.ok) {
        alert('Successfully joined the league');
        window.location.reload();
      } else {
        const data = await response.json();
        alert(`${data.message}`);
        navigate('/UserDashboard');

      }
    } catch (error) {
      console.error('Error joining league:', error);
    }
  };

  if (navigateDashboard) {
    return <AffiliateFightLeaderboard matchId={navigateDashboard} />;
  }

  if (!match) {
    console.log("Match not found or still loading...");
    return <p>Loading...</p>;
  }

  if (!affiliate) {
    console.log("Affiliate not found or still loading...");
    return <div>Loading...</div>;
  }
   
  return (
   <> <div className='promotional-container-new'>
      
      <div class="promotional-max-width">
	<div class="top-row">
		<h2>Fantasy Mmadness</h2>
		<h3>{new Date().toLocaleString('en-US', { month: 'short' }).toUpperCase()}</h3>
	</div>
	<div class="fighter-images">
	<img src={match.fighterAImage} alt={match.matchFighterA} />
	<img src={match.fighterBImage} alt={match.matchFighterB} />
	</div>
	
	<div class="last-row">
	<h3>Classic Fight</h3>
	<h1>{match.matchCategoryTwo ? match.matchCategoryTwo : match.matchCategory}</h1>
	<h3>Tournament</h3>
	<div class="justify-space-between">
	<h6>{match.matchFighterA.split(" ")[0]}</h6>
<h5>VS</h5>
<h6>{match.matchFighterB.split(" ")[0]}</h6>
</div>
	<h4>${match.matchTokens} Ticket - Free Signup</h4>
	<p>POT: {match.pot}, Max Rounds: {match.maxRounds} <br />Affiliate: {affiliate.firstName}</p>
  </div>
  <button className='join-league-button'  onClick={handleJoinLeague}>Join {affiliate.firstName}'s league</button>
  </div> 
  <img src={background} className='background-in-promo' alt="promo" />
    </div>
 
    {match.matchPromotionalVideoUrl && (
  <div className="videoContainer">
    <video className="responsiveVideo" controls>
      <source src={match.matchPromotionalVideoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
)}

    </> );
};

export default Promo;
