import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMatches } from '../../Redux/matchSlice';
import "./shadowLibrary.css";
const ShadowFightsLibrary = () => {
    const dispatch = useDispatch();
    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [showFightPopup, setShowFightPopup] = useState(false);
    const [showAffiliatesPopup, setShowAffiliatesPopup] = useState(false);
    const [affiliates, setAffiliates] = useState([]);


    // Function to fetch matches
    const fetchMatchesData = async () => {
        try {
            const response = await fetch("https://fantasymmadness-game-server-three.vercel.app/shadow");
            const data = await response.json();
            setMatches(data);
        } catch (error) {
            console.error("Error fetching matches:", error);
        }
    };

    // Function to fetch affiliates
    const fetchAffiliatesData = async () => {
        try {
            const response = await fetch("https://fantasymmadness-game-server-three.vercel.app/affiliates");
            const data = await response.json();
            setAffiliates(data);
        } catch (error) {
            console.error("Error fetching affiliates:", error);
        }
    };

    useEffect(() => {
        // Fetch matches and affiliates initially
        fetchMatchesData();
        fetchAffiliatesData();
    }, []);

    const handleFightItemClick = (match) => {
        setSelectedMatch(match);
        setShowFightPopup(true);
    };

    const handleDeleteClick = async () => {
        if (selectedMatch) {
            try {
                const response = await fetch(`https://fantasymmadness-game-server-three.vercel.app/shadowfighttodelete/${selectedMatch._id}`, { method: 'DELETE' });
    
                // Log the entire response object
                console.log('Full response object:', response);
    
                // Check if the response is OK
                if (response.ok) {
                    // Parse the response body to log it
                    const responseData = await response.json();
                    console.log('Response body:', responseData);
    
                    // Proceed with your existing logic
                    setShowFightPopup(false);
                    setSelectedMatch(null);
                    fetchMatchesData(); // Refresh match list
                    dispatch(fetchMatches()); // Redux state update
                } else {
                    // Handle unsuccessful response
                    console.error('Failed to delete the match:', response.statusText);
                    alert("Failed to delete the match");
                }
            } catch (error) {
                console.error("Error deleting match:", error);
            }
        }
    };
    
    const handleViewAffiliatesClick = () => {
        setShowAffiliatesPopup(true);
    };

    const closeFightPopup = () => {
        setShowFightPopup(false);
        setSelectedMatch(null);
    };

    const closeAffiliatesPopup = () => {
        setShowAffiliatesPopup(false);
    };

    // Filter affiliates matching AffiliateIds in the selected match
    const filteredAffiliates = selectedMatch
        ? affiliates.filter(affiliate =>
              selectedMatch.AffiliateIds.some(({ AffiliateId }) => AffiliateId === affiliate._id)
          )
        : [];

    return (
        <div className='shadowLibrary'>
            <div className='adminWrapper '>
                <div className='homeSecond' style={{ background: 'transparent' }}>
                    <h1 className='second-main-heading'>Shadow Fights Library</h1>
                    <div className="fightswrap">
                        {matches.length > 0 ? (
                            matches.map((match) => (
                                <div className="fightItem" key={match._id} onClick={() => handleFightItemClick(match)}>
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
                                                <h1>Affiliates Promoting this fight</h1>
                                            </div>
                                            <div className='transformed-div-two-partTwo'>
                                                <h1>{match.AffiliateIds.length}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='fightItemTwo'>
                                        <div className="transformed-div-three">
                                            <p>{match.matchDescription}</p>
                                        </div>
                                        <div className="transformed-div-four">
                                            <h1>{match.matchType}</h1>
                                            <p>{match.matchCategoryTwo ? match.matchCategoryTwo : match.matchCategory}</p>
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

            {showFightPopup && selectedMatch && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>{selectedMatch.matchFighterA} -VS- {selectedMatch.matchFighterB}</h2>
                        <p>{selectedMatch.matchDescription}</p>
                        <p>Type: {selectedMatch.matchType}</p>
                        
                        <p>Category: {selectedMatch.matchCategoryTwo ? selectedMatch.matchCategoryTwo : selectedMatch.matchCategory}</p>
                        <div className="popup-actions">
                            <button onClick={handleDeleteClick} style={{background:'crimson'}}>Delete Match</button>
                            <button onClick={handleViewAffiliatesClick}>View Affiliates</button>
                            <button onClick={closeFightPopup} style={{background:'gray'}}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {showAffiliatesPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Affiliates for {selectedMatch.matchFighterA} -VS- {selectedMatch.matchFighterB}</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Player Name</th>
                                    <th>Profile</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAffiliates.map((affiliate) => (
                                    <tr key={affiliate._id}>
                                        <td>{affiliate.firstName} {affiliate.lastName}</td>
                                        <td>{affiliate.email}</td>
                                        <td>{affiliate.playerName}</td>
                                        <td><img src={affiliate.profileUrl} alt={affiliate.playerName} style={{ width: '50px' }} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={closeAffiliatesPopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShadowFightsLibrary;
