import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMatches } from '../../Redux/matchSlice';
import AffiliateFightLeaderboard from './AffiliateFightLeaderboard';

const Promo = () => {
  const dispatch = useDispatch();
  const { matchName, firstName } = useParams();
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
      dispatch(fetchMatches());
    }
  }, [matchStatus, dispatch]);

  useEffect(() => {
    const fetchAffiliateData = async () => {
      try {
        const response = await fetch('https://fantasymmadness-game-server-three.vercel.app/affiliates');
        const affiliates = await response.json();
        const filteredAffiliate = affiliates.find((aff) => aff.firstName === firstName);
        setAffiliate(filteredAffiliate);
      } catch (error) {
        console.error('Error fetching affiliate data:', error);
      }
    };

    fetchAffiliateData();
  }, [firstName]);

  useEffect(() => {
    if (affiliate) {
      const affiliateId = affiliate._id;
      const foundMatch = matches.find((m) => m.matchName === matchName && m.affiliateId === affiliateId);
      setMatch(foundMatch);
    }
  }, [affiliate, matches, matchName]);

  const handleJoinLeague = async () => {
    if (!isAuthenticated) {
      window.open('/login', '_blank'); // Open login page in a new window
      return;
    }

    const userId = user._id;
    const userEmail = user.email;

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

  const handleDeleteFight = async (id) => {
    try {
      const response = await fetch(`https://fantasymmadness-game-server-three.vercel.app/api/matches/${id}?affiliateId=${affiliate._id}`, {
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

  const handleDashboardOpening = (id) => {
    setNavigateToDash(id);
  };

  if (navigateDashboard) {
    return <AffiliateFightLeaderboard matchId={navigateDashboard} />;
  }

  if (!match) {
    return <p>Loading...</p>;
  }

  if (!affiliate) {
    return <div>Loading...</div>;
  }

  return (
    <div className='fightDetails'>
      <div className='member-header' style={{ marginBottom: '30px' }}>
        <div className='member-header-image'>
          <img src={affiliate.profileUrl} alt="Affiliate" />
        </div>
        <h3>Affiliate Name - {affiliate.firstName} {affiliate.lastName}</h3>
        <h3>Users Joined League: {affiliate.usersJoined.length}</h3>
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
          <button className='btn-grad' style={{ width: '14%' }} onClick={handleJoinLeague}>Join my league</button>
        </div>
      </div>
    </div>
  );
};

export default Promo;
