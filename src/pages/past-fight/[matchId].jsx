import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import "../../Components/PastFightsNew/style.css";
// Import assets
import one from "../../Assets/calender/four.png";
import two from "../../Assets/calender/six.png";
import { fetchMatches } from '@/Redux/matchSlice';

const PastFightDetails = () => {
    
  const matchStatus = useSelector((state) => state.matches.status);
    const dispatch = useDispatch();
    const router = useRouter();
    const { matchId } = router.query;

  useEffect(() => {
    if (matchStatus === 'idle') {
      dispatch(fetchMatches());
    }
  }, [matchStatus, dispatch]);

    // Fetch match details from Redux store
    const match = useSelector((state) =>
        state.matches?.data?.find((fight) => fight._id === matchId)
    );
console.log(match);
    if (!match) return <p>Loading fight details...</p>;

    return (
        <div className='past-fights-container details-of-past-fight'>
            <Image src={one} alt="one" className='one-in-past' />
            <Image src={two} alt="two" className='two-in-past' />
            <Image src={two} alt="three" className='three-in-past' />

            <div className='past-fights-details'>
                <h1>{match.matchName}</h1>
                <div className='fighter-images-in-past-details'>
                    <div className='flex-col'>
                        <img src={match.fighterAImage} alt={match.matchFighterA}  />
                        <h5 className='fighter-name'>{match.matchFighterA}</h5>
                    </div>

                    <div className='details-content'>
                        <h2>Step Into the Action</h2>
                        <h1>{match.matchCategoryTwo || match.matchCategory}</h1>
                        <h3>Create Leagues. Build Teams. Win $10,000!.</h3>
                        <div className="line"></div>
                        <h4>Your Arena, Your Rules – Dive into the Ultimate MMA Experience.</h4>
                        <h5>Where strategy meets thrill – are you ready?</h5>
                    </div>

                    <div className='flex-col'>
                        <img src={match.fighterBImage} alt={match.matchFighterB}  />
                        <h5 className='fighter-name'>{match.matchFighterB}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PastFightDetails;
