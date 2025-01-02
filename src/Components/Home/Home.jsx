import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { stopMusic, playMusic } from '../../Redux/musicSlice';
import './Home.css';
import MoneyOne from "../../Assets/money1.png";
import MoneyTwo from "../../Assets/money2.png";
import { Link } from 'react-router-dom';
const Home = () => {
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
      <div className="homeFirst">
        <h1 data-aos="zoom-out">The thrill of combat</h1>
        <h3 data-aos="zoom-out">Exploring the excitement of</h3>
        <h2 >
          Boxing, MMA,
           Kickboxing<br /> & Bare knuckle
        </h2>


        <h3 style={{display:'none'}}>The thrill of combat Fantasy Mmadness llc</h3>
        <h4 style={{display:'none'}}>Boxing, MMA, Kickboxing<br /> & Bare knuckle Fantasy Mmadness llc</h4>
        <h5 style={{display:'none'}}>The thrill of combat Fantasy Mmadness llc</h5>
        <h6 style={{display:'none'}}>Boxing, MMA, Fantasy Mmadness llc Kickboxing & Bare knuckle</h6>

        
      </div>

      <div className='homeSecondSection'>
      <h1>Step into the <span>madness</span></h1>
      <div className="video-embed-wrapper">
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

<div className='homeThirdSection'>
<div className='subHomeThird'>
<h1 >Welcome, New Users! Claim Your $20 Tokens Free Today!</h1>
  <p >Join the action now and kickstart your journey in Fantasy Mmadness with an exclusive bonus!</p>
  <Link to="/CreateAccount"><button className='thirdHomePageButton'>Sign Up Now</button></Link>
</div>
</div>

     {/*  <div className='thirdHomePageSection'>
      <img src={MoneyOne} className='moneyone' alt='money' />
      <img src={MoneyTwo} className='moneytwo' alt='money' />
  <h1 className='thirdHomePageHeading'>🎉 Welcome, NEW USERS! 🎉</h1>
  <h2 className='thirdHomePageSubheading'>Claim Your $20 Tokens Free Today!</h2>
  <p className='thirdHomePageDescription'>Join the action now and kickstart your journey in Fantasy MMA Madness with an exclusive bonus!</p>
  <Link to="/CreateAccount"><button className='thirdHomePageButton'>Sign Up Now 🚀</button></Link>
</div> */}

    </>
  );
};

export default Home;
