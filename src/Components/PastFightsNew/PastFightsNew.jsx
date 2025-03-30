import React from 'react'; 
import "./style.css";
import one from "../../Assets/calender/four.png";
import two from "../../Assets/calender/six.png";
import PastFightsContent from './PastFightsContent';
import Image from 'next/image';


const PastFightsNew = ({pastMatches}) => {
    return (
        <div className='past-fights-container' style={{ height: '100vh' }}>
            <Image src={one} alt="one" className='one-in-past' />
            <Image src={two} alt="one" className='two-in-past' />
            <Image src={two} alt="one" className='three-in-past' />

                <PastFightsContent matches={pastMatches} />
          </div>
    );
};

export default PastFightsNew;
