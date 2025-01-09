import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet'; // Import react-helmet
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
      {/* SEO Metadata */}
      <Helmet>
        <title>Fantasy Mmadness - Home</title>
        <meta name="description" content="Experience the thrill of combat sports like Boxing, MMA, Kickboxing, and Bare Knuckle. Join now and claim your $20 free tokens today!" />
        <meta property="og:title" content="Fantasy MMA Madness - Thrill of Combat" />
        <meta property="og:description" content="Experience the thrill of combat sports like Boxing, MMA, Kickboxing, and Bare Knuckle. Join now and claim your $20 free tokens today!" />
        <meta property="og:image" content="/path-to-image.jpg" />
        <meta property="og:url" content="https://fantasymmadness.com/" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta name="keywords" content="MMA, Fantasy Sports, Boxing, Kickboxing, Bare Knuckle, Combat Sports, Free Tokens" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <div className="homeFirst">
        <h1 data-aos="zoom-out">The thrill of combat</h1>
        <h2 data-aos="zoom-out">
          Boxing, MMA,
           Kickboxing<br /> & Bare knuckle
        </h2>

        <div className="video-embed-wrapper">
          <div className="no-hover">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/C5wHWEzPrrs?autoplay=1&loop=1&playlist=C5wHWEzPrrs&controls=0&modestbranding=1&rel=0&fs=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <div className='thirdHomePageSection'>
        <img src={MoneyOne} className='moneyone' alt='money' />
        <img src={MoneyTwo} className='moneytwo' alt='money' />
        <h1 className='thirdHomePageHeading'>🎉 Welcome, NEW USERS! 🎉</h1>
        <h2 className='thirdHomePageSubheading'>Claim Your $20 Tokens Free Today!</h2>
        <p className='thirdHomePageDescription'>Join the action now and kickstart your journey in Fantasy MMA Madness with an exclusive bonus!</p>
        <Link to="/CreateAccount"><button className='thirdHomePageButton'>Sign Up Now 🚀</button></Link>
      </div>
    </>
  );
};

export default Home;
