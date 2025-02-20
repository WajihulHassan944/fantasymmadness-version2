import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../../Redux/matchSlice';
import "./style.css";
import one from "../../Assets/calender/four.png";
import two from "../../Assets/calender/six.png";

const PastFightsNew = () => {
    const dispatch = useDispatch();
    const matches = useSelector((state) => state.matches.data);
    const matchStatus = useSelector((state) => state.matches.status);
    const [pastMatches, setPastMatches] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const matchesPerPage = 8;

    useEffect(() => {
        if (matchStatus === 'idle') {
            dispatch(fetchMatches());
        }
    }, [matchStatus, dispatch]);

    useEffect(() => {
        const today = new Date();
        const currentTime = new Date();
        
        const filteredMatches = matches.map((match) => {
            const matchDate = match.matchDate?.split('T')[0];
            const matchDateTime = new Date(`${matchDate}T${match.matchTime}:00`);
            if (matchDateTime < currentTime) {
                return { ...match, matchDate };
            }
            return null;
        }).filter(Boolean);

        setPastMatches(filteredMatches);
    }, [matches]);

    const totalPages = Math.ceil(pastMatches.length / matchesPerPage);
    const paginatedMatches = pastMatches.slice(currentPage * matchesPerPage, (currentPage + 1) * matchesPerPage);

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='past-fights-container' style={{ height: '100vh' }}>
            <img src={one} alt="one" className='one-in-past' />
            <img src={two} alt="one" className='two-in-past' />
            <img src={two} alt="one" className='three-in-past' />

            <h1>Past Fights</h1>
            <div className='fights-grid'>
                <div className='column one'>
                    {paginatedMatches.slice(0, 4).map((fight, index) => (
                        <div key={index} className='fight-card'>
                            <div className='fight-date'>
                                <span className='date'>{fight.matchDate?.split('-')[2]}</span>
                                <span className='month'>{new Date(fight.matchDate).toLocaleString('en-US', { month: 'short' }).toUpperCase()}</span>
                            </div>
                            <div className='fight-info'>
                                <h2>{fight.matchFighterA.split(' ')[0]} Vs {fight.matchFighterB.split(' ')[0]}</h2>
                                <p>{fight.matchCategoryTwo ? fight.matchCategoryTwo : fight.matchCategory} | {fight.matchTime}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='column two'>
                    {paginatedMatches.slice(4, 8).map((fight, index) => (
                        <div key={index} className='fight-card'>
                            <div className='fight-date'>
                                <span className='date'>{fight.matchDate?.split('-')[2]}</span>
                                <span className='month'>{new Date(fight.matchDate).toLocaleString('en-US', { month: 'short' }).toUpperCase()}</span>
                            </div>
                            <div className='fight-info'>
                                <h2>{fight.matchFighterA.split(' ')[0]} Vs {fight.matchFighterB.split(' ')[0]}</h2>
                                <p>{fight.matchCategoryTwo ? fight.matchCategoryTwo : fight.matchCategory} | {fight.matchTime}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="nav-icons-past-fights">
                <i className="fa fa-chevron-left left-icon" onClick={handlePrev}></i>
                <i className="fa fa-chevron-right right-icon" onClick={handleNext}></i>
            </div>
        </div>
    );
};

export default PastFightsNew;