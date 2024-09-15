import React from 'react';
import "./Home.css";
const Home = () => {

  return (
    <>
    <div className='homeFirst'>
    <h1 data-aos="zoom-out">The thrill of combat</h1>
    <h2 data-aos="zoom-out">Boxing, MMA,<br /> Kickboxing & BK</h2>

    <div class="video-embed-wrapper" >
    <iframe 
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/C5wHWEzPrrs?autoplay=1&loop=1&playlist=C5wHWEzPrrs" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen >
    </iframe>
    
</div> 
    </div>

    </>
  )
}

export default Home
