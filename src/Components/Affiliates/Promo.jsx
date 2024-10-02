import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMatches } from '../../Redux/matchSlice';
import AffiliateFightLeaderboard from './AffiliateFightLeaderboard';

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
    <div className='fightDetails'>
      <div className='member-header' style={{ marginBottom: '30px' }}>
        <div className='member-header-image'>
          <img src={affiliate.profileUrl} alt="Affiliate" />
        </div>
        <h3>Affiliate<span className="toRemove"> Name</span> - {affiliate.firstName} <span className="toRemove">{affiliate.lastName}</span></h3>
        <h3>Users Joined <span className="toRemove"> League</span>: {affiliate.usersJoined.length}</h3>
      </div>

      <div className='fightDetailsContainer'>
        <h1 className='fightDetailsContainerFirstHeading'>Fight: <span>{match.matchName}</span></h1>

        <div className='fightersImagesInFightDetails'>
          <div className='imgWrapFights'><img src={match.fighterAImage} alt={match.matchFighterA} /></div>
          <h1>VS</h1>
          <div className='imgWrapFights'><img src={match.fighterBImage} alt={match.matchFighterB} /></div>
        </div>

        <div className='fightDetailsPot'>
          <h1 style={{ background: '#e90000', padding: '5px 10px', fontSize: '22px' }}>This fight is approved.</h1>
        </div>

        <h1 className='fightTypeInFightDetails' style={{ fontSize: '21.5px' }}>
          Fight type: <span>{match.matchCategoryTwo ? match.matchCategoryTwo : match.matchCategory}</span>
          - <span style={{ color: '#3fd50b' }}>{match.matchType} </span>
          - <span>{match.matchFighterA} </span> VS <span>{match.matchFighterB} </span>
        </h1>

        <div className='fightDetailsPot'>
          <h1>POT :</h1>
          <p style={{ color: "#38b90c" }}>{match.pot}</p>
        </div>

        <div className='beiginningTimeFight'>
          <h1 style={{ fontSize: '21.5px' }}> {new Date(match.matchDate).toLocaleDateString()} - </h1>
          <p style={{ color: "#38b90c" }}>{match.matchTime}</p>
        </div>

        <div style={{ width: '100%', display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          <button className='btn-grad promobtn'  onClick={handleJoinLeague}>Join my league</button>
        </div>
      </div>
    </div>
  );
};

export default Promo;
