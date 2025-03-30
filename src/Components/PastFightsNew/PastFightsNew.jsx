import React from 'react'; 
import "./style.css";
import one from "../../Assets/calender/four.png";
import two from "../../Assets/calender/six.png";
import PastFightsContent from './PastFightsContent';

const PastFightsNew = () => {
  
    return (
        <div className='past-fights-container' style={{ height: '100vh' }}>
            <img src={one} alt="one" className='one-in-past' />
            <img src={two} alt="one" className='two-in-past' />
            <img src={two} alt="one" className='three-in-past' />

                <PastFightsContent />
          </div>
    );
};

export default PastFightsNew;
