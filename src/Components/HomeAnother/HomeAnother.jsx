import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { stopMusic, playMusic } from '../../Redux/musicSlice';
import './Home.css';
import { Link } from 'react-router-dom';
const HomeAnother = () => {
  const dispatch = useDispatch();
  const howlerRef = useRef(null);

  useEffect(() => {
    // Get current seek position and stop music
    const currentSeek = howlerRef.current?.seek() || 0;
    dispatch(stopMusic(currentSeek)); // Stop music and store the seek position

    return () => {
      // Play music from stored position when component unmounts
      dispatch(playMusic());
    };
  }, [dispatch]);

  return (
    <>
      <div className="homeFirstAnother">
        <h1 data-aos="zoom-out">Step Into The Madness</h1>
        <h3 data-aos="zoom-out">Unleash the fantasy </h3>
        <h2 >
        of combat sports
        </h2>


        <h3 style={{display:'none'}}>The thrill of combat Fantasy Mmadness llc</h3>
        <h4 style={{display:'none'}}>Boxing, MMA, Kickboxing<br /> & Bare knuckle Fantasy Mmadness llc</h4>
        <h5 style={{display:'none'}}>The thrill of combat Fantasy Mmadness llc</h5>
        <h6 style={{display:'none'}}>Boxing, MMA, Fantasy Mmadness llc Kickboxing & Bare knuckle</h6>

        
      </div>

<div className='homeFourthAnother'>
    <div className='text-fourth'>
      <h1>Our Leagues</h1>
      <p>Joining a fighter's league offers excitement and the chance for significant earnings and rewards. Research various leagues to find the right fit for your goals and skill level. Best of luck on your boxing journey!
      </p>
    </div>
</div>

<div className='homeFifthAnother'>
    <div className='text-fifth'>
      <h1>Leaderboard</h1>
      <p>Hello fight enthusiast! Put your combat knowledge to the test and win prizes by joining our prediction game. Predict upcoming fight outcomes, earn points for each correct prediction, and climb the leaderboard for bigger rewards! 
      </p>
    </div>
</div>

      <div className='homeSecondSectionAnother'>
      <h1>Step into the <span>madness</span></h1>
      <div className="video-embed-wrapperAnother">
          <div className="no-hover">
            <iframe
              src="https://www.youtube.com/embed/C5wHWEzPrrs?autoplay=1&loop=1&playlist=C5wHWEzPrrs&controls=0&modestbranding=1&rel=0&fs=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        </div>

        <div className='homeThirdSectionAnother'>
<div className='subHomeThird'>
<h1 >Welcome, New Users! Claim Your $20 Tokens Free Today!</h1>
  <p >Join the action now and kickstart your journey in Fantasy Mmadness with an exclusive bonus!</p>
  <Link to="/CreateAccount"><button className='thirdHomePageButton'>Sign Up Now</button></Link>
</div>
</div>
    </>
  );
};

export default HomeAnother;
