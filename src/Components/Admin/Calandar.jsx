import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../../Redux/matchSlice';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { formatISO, isSameDay, parseISO } from 'date-fns';
import './calendar.css'; // Make sure to include your styles here
import { useNavigate } from 'react-router-dom';

const Calandar = () => {
    const dispatch = useDispatch();
    const matches = useSelector((state) => state.matches.data);
    const matchStatus = useSelector((state) => state.matches.status);
    const [date, setDate] = useState(new Date());
    const [selectedMatches, setSelectedMatches] = useState([]);
    const [highlightedDates, setHighlightedDates] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentMatch, setCurrentMatch] = useState(null);
    const [dateModalVisible, setDateModalVisible] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (matchStatus === 'idle') {
            dispatch(fetchMatches());
        }
    }, [matchStatus, dispatch]);

    useEffect(() => {
        if (matches) {
            const matchDates = matches.map(match => {
                const matchDate = new Date(match.matchDate);
                // Convert match date to YYYY-MM-DD format
                return formatISO(matchDate, { representation: 'date' });
            });
            console.log('Match Dates:', matchDates); // Debugging
            setHighlightedDates(matchDates);
        }
    }, [matches]);

    const handleDateChange = (date) => {
        setDate(date);

        const selectedDate = formatISO(date, { representation: 'date' });
        console.log('Selected Date:', selectedDate); // Debugging
        const filteredMatches = matches.filter(match => {
            const matchDate = new Date(match.matchDate);
            return formatISO(matchDate, { representation: 'date' }) === selectedDate;
        });
        console.log('Filtered Matches:', filteredMatches); // Debugging
        setSelectedMatches(filteredMatches);
        setDateModalVisible(filteredMatches.length > 0);
    };

    const openMatchModal = (match) => {
        setCurrentMatch(match);
        setModalVisible(true);
    };

    const closeMatchModal = () => {
        setModalVisible(false);
        setCurrentMatch(null);
    };

    const closeDateModal = () => {
        setDateModalVisible(false);
        setSelectedMatches([]);
    };

    if (!matches) {
        return <div>Loading...</div>;
    }

    return (
        <div className='adminWrapper'>
         <i
        className="fa fa-arrow-circle-left"
        aria-hidden="true"
        onClick={() => navigate(-1)} // Go back to the previous page
        style={{ position: 'absolute', top: '38px', left: '18%', cursor: 'pointer', fontSize: '24px', color: '#007bff', zIndex: '99999' }}
      ></i>
  
            <Calendar
                onChange={handleDateChange}
                value={date}
                tileClassName={({ date, view }) => {
                    if (view === 'month' && highlightedDates.some(highlightedDate => isSameDay(date, parseISO(highlightedDate)))) {
                        return 'highlighted-date';
                    }
                }}
            />

            {/* Date Modal */}
            {dateModalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeDateModal}>&times;</span>
                        <h2>Matches on {date.toDateString()}:</h2>
                        {selectedMatches.length > 0 ? (
                            selectedMatches.map(match => (
                                <div
                                    key={match._id}
                                    className="match-item"
                                    onClick={() => openMatchModal(match)}
                                >
                                    <h3>{match.matchName}</h3>
                                    <p>{match.matchDescription}</p>
                                </div>
                            ))
                        ) : (
                            <p>No matches on this date.</p>
                        )}
                    </div>
                </div>
            )}

            {/* Match Modal */}
           
            {modalVisible && currentMatch && (
    <div className="modal">
        <div className="modal-content">
            <span className="close" onClick={closeMatchModal}>&times;</span>
            <h3>{currentMatch.matchName}</h3>
            <p>{currentMatch.matchDescription}</p>
            <p><strong>Date:</strong> {new Date(currentMatch.matchDate).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {new Date(`1970-01-01T${currentMatch.matchTime}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
</p>
            <p><strong>Venue:</strong> {currentMatch.venue}</p>
            <div className="match-images">
                <img src={currentMatch.fighterAImage} alt={currentMatch.matchFighterA} />
                <img src={currentMatch.fighterBImage} alt={currentMatch.matchFighterB} />
            </div>
        </div>
    </div>
)}

        </div>
    );
};

export default Calandar;
