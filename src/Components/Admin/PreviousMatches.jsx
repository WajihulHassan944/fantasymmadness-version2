import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../../Redux/matchSlice';
import Popup from './Popup'; // Create this component for displaying winner details
import { getWinnerDetails } from '../../CustomFunctions/winnerUtils';

const PreviousMatches = () => {
    const dispatch = useDispatch();
    const matches = useSelector((state) => state.matches.data);
    const [filter, setFilter] = useState('All');
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [winnerDetails, setWinnerDetails] = useState(null);
    const [matchTokens, setMatchTokens] = useState(0); // State to hold match tokens
    useEffect(() => {
        dispatch(fetchMatches());
    }, [dispatch]);

    const handleMatchClick = async (matchId) => {
      const winner = await getWinnerDetails(matchId);
      setWinnerDetails(winner);
      setMatchTokens(matches.find(m => m._id === matchId).pot);
      setSelectedMatch(matchId);
  };
    const handleClosePopup = () => {
        setSelectedMatch(null);
        setWinnerDetails(null);
        setMatchTokens(null);
    };

    const handleRewardTokens = async () => {
        if (winnerDetails) {
            try {
                const response = await fetch(`https://fantasymmadness-game-server-three.vercel.app/api/reward-tokens/${winnerDetails.userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        tokens: matches.find(m => m._id === selectedMatch).pot,
                        matchId: selectedMatch,
                    }),
                });

                const data = await response.json();
                if (data.success) {
                    alert('Tokens rewarded successfully!');
                    // Reset selectedMatch and winnerDetails
                    setSelectedMatch(null);
                    setWinnerDetails(null);
                    window.location.reload();
                } else {
                    alert('Failed to reward tokens.');
                }
            } catch (error) {
                console.error('Error rewarding tokens:', error);
            } finally {
                handleClosePopup();
            }
        }
    };

    const filteredMatches = matches.filter((match) => {
        if (filter === 'All') return match.matchStatus === 'Finished';
        if (filter === 'Rewarded') return match.matchReward === 'Rewarded' && match.matchStatus === 'Finished';
        if (filter === 'NotRewarded') return match.matchReward === 'NotRewarded' && match.matchStatus === 'Finished';
        return false;
    });

    return (
        <div className='prevMatches'>
            <div className='adminWrapper'>
                <div className='homeSecond' style={{ background: 'transparent' }}>
                    <h1 className='second-main-heading'>All fights <span className='toRemove'>/ Previous Fights</span></h1>

                    <div className='controls'>
                        <h5 className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>All</h5>
                        <h5 className={filter === 'Rewarded' ? 'active' : ''} onClick={() => setFilter('Rewarded')}>Rewarded Fights</h5>
                        <h5 className={filter === 'NotRewarded' ? 'active' : ''} onClick={() => setFilter('NotRewarded')}>Non-rewarded Fights</h5>
                    </div>

                    <div className="fightswrap">
                        {filteredMatches.length > 0 ? (
                            filteredMatches.map((match) => (
                                <div 
                                    className="fightItem" 
                                    key={match._id} 
                                    onClick={match.matchReward === 'NotRewarded' 
                  ? () => handleMatchClick(match._id) 
                  : () => alert('Rewards already given')
                }
                
                                >
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
                                                <h1>{match.matchCategory}</h1>
                                                <h1>{new Date(`1970-01-01T${match.matchTime}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</h1>
                                            </div>
                                            <div className='transformed-div-two-partTwo'>
                                                <p>{new Date(match.matchDate).toLocaleDateString()}</p>
                                                <h1>{match.matchType}</h1>
                                                <h1>pot ${match.pot}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='fightItemTwo'>
                                        <div className="transformed-div-three">
                                            <p>{match.matchDescription}</p>
                                        </div>
                                        <div className="transformed-div-four">
                                            <h1>Status</h1>
                                            <p>{match.matchStatus}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className='noMatch'>No upcoming matches</p>
                        )}
                    </div>
                </div>
            </div>
            {selectedMatch && winnerDetails && (
                <Popup 
                    winnerDetails={winnerDetails} 
                    onClose={handleClosePopup} 
                    onReward={handleRewardTokens} 
                    matchTokens={matchTokens}
                />
            )}
        </div>
    );
}

export default PreviousMatches;
