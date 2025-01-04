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
      <div className='homeSecondSectionAnother'>
      <h1 className='homeAnotherHeading'>Step into the <span>madness</span></h1>
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

<div className='homeFourthAnother'>
    <div className='text-fourth'>
      <h1 className='homeAnotherHeading'>Our Leagues</h1>
      <p style={{marginBottom:'30px'}}>Joining a fighter's league offers excitement and the chance for significant earnings and rewards. Research various leagues to find the right fit for your goals and skill level. Best of luck on your boxing journey!
      </p>
      <center><Link to="/login" className='playNowLink'>Play Now!</Link></center>
    </div>
</div>

<div className='homeFifthAnother'>
    <div className='text-fifth'>
      <h1 className='homeAnotherHeading'>Leaderboard</h1>
      <p style={{marginBottom:'30px'}}>Hello fight enthusiast! Put your combat knowledge to the test and win prizes by joining our prediction game. Predict upcoming fight outcomes, earn points for each correct prediction, and climb the leaderboard for bigger rewards! 
      </p>
      <center><Link to="/login" className='playNowLink'>Play Now!</Link></center>
    </div>
</div>


<div className='homeFourthAnother homeFourthAnotherPatTwo'>
    <div className='text-fourth'>
      <h1 className='homeAnotherHeading'>The Ultimate Showcase: MMA</h1>
      <p style={{marginBottom:'30px'}}>
      MMA, or mixed martial arts, is a dynamic and ever-evolving combat sport that brings together a variety of disciplines, including boxing, Brazilian Jiu-Jitsu, Muay Thai, and wrestling. It’s a true test of versatility, where fighters must adapt to different styles and techniques to secure victory.

       </p>
       <center><Link to="/login" className='playNowLink'>Play Now!</Link></center>
    </div>
</div>
 
<div className='homeFifthAnother homeFifthAnotherPartTwo'>
    <div className='text-fifth'>
      <h1 className='homeAnotherHeading'>Play For Free</h1>
      <p style={{marginBottom:'30px'}}>
      Welcome to Fantasy-MMadness, where you can dive into the thrill of fantasy MMA without any cost! Create your dream lineup, make fight predictions, and compete for bragging rights—all for free. Whether you're new or experienced, our free games let you learn the ropes and enjoy the excitement with no financial risk. Ready to get started? Sign up, make your predictions, and see how you rank on the leaderboard!
     </p>
     <center><Link to="/login" className='playNowLink'>Play Now!</Link></center>
    </div>
</div>
    
    </>
  );
};

export default HomeAnother;
