import React from 'react'
import "./Home.css";
import FighterOne from "../../Assets/fighterOne.png";
import FighterTwo from "../../Assets/fighterTwo.png";

const Home = () => {
  return (
    <>
    <div className='homeFirst'>
    <h1>The thrill of combat</h1>
    <h2>Boxing, MMA, And Kickboxing</h2>
    </div>








    <div className='homeSecond' id="upcomingFightsDiv">

        <h1 className='second-main-heading'>Upcoming fights / Active fights</h1>

        <div class="fightswrap">

            <div class="fightItem">
<div className='fightersImages'>
<div className='fighterOne'><img src={FighterOne} /></div>
<div className='fighterTwo'><img src={FighterTwo} /></div>
</div>

            <div className='fightItemOne'>
            <div class="transformed-div"> <h1>Player A -VS Player B</h1></div>
            <div class="transformed-div-two">
              <div className='transformed-div-two-partOne'>
                <h1>Kick boxing</h1>
                <h1>6:00pm est</h1>
              </div>
              <div className='transformed-div-two-partTwo'>
                <p>6/2/2024</p>
                <h1>Live</h1>
                <h1>pot $1000</h1>
              </div>


            </div>
            </div>
            <div className='fightItemTwo'>
            <div class="transformed-div-three"><p>Additional Fight Info will be added later</p></div>
            <div class="transformed-div-four"><h1>Players</h1><p>400</p></div>
            </div>    
                    </div>




            
            <div class="fightItem">
<div className='fightersImages'>
<div className='fighterOne'><img src={FighterOne} /></div>
<div className='fighterTwo'><img src={FighterTwo} /></div>
</div>

            <div className='fightItemOne'>
            <div class="transformed-div"> <h1>Player A -VS Player B</h1></div>
            <div class="transformed-div-two">
              <div className='transformed-div-two-partOne'>
                <h1>Kick boxing</h1>
                <h1>6:00pm est</h1>
              </div>
              <div className='transformed-div-two-partTwo'>
                <p>6/2/2024</p>
                <h1>shadow</h1>
                <h1>pot $1000</h1>
              </div>


            </div>
            </div>
            <div className='fightItemTwo'>
            <div class="transformed-div-three"><p>Additional Fight Info will be added later</p></div>
            <div class="transformed-div-four"><h1>Players</h1><p>400</p></div>
            </div>
</div>



            
            <div class="fightItem">
<div className='fightersImages'>
<div className='fighterOne'><img src={FighterOne} /></div>
<div className='fighterTwo'><img src={FighterTwo} /></div>
</div>

            <div className='fightItemOne'>
            <div class="transformed-div"> <h1>Player A -VS Player B</h1></div>
            <div class="transformed-div-two">
              <div className='transformed-div-two-partOne'>
                <h1>Kick boxing</h1>
                <h1>6:00pm est</h1>
              </div>
              <div className='transformed-div-two-partTwo'>
                <p>6/2/2024</p>
                <h1>shadow</h1>
                <h1>pot $1000</h1>
              </div>


            </div>
            </div>
            <div className='fightItemTwo'>
            <div class="transformed-div-three"><p>Additional Fight Info will be added later</p></div>
            <div class="transformed-div-four"><h1>Players</h1><p>400</p></div>
            </div>
</div>

        </div>

    </div>










    <div className='homeThird'>
        <h1 className='thirdHeadingOne'>Global Leader Board</h1>
        <h2 >Players - <span>10433</span></h2>

        <div className='leaderboardHeading'><h3>Leaderboard</h3></div>
<div className='controls'><h5 className='active'>All time</h5><h5>Last week</h5> <h5>Last month</h5></div>
    
    
    <div className='leaderboardItemsWrap'>
      
      <div className='leaderboardItem'>
       <div className='leaderboard-item-image'><img src={FighterOne} /></div>
        <h1>MadMarkus</h1>
        <h1>RW#</h1>
        <h1>ko#</h1>
        <h1>Points 78000</h1>
        <h1>#1</h1>
      </div>


      <div className='leaderboardItem'>
       <div className='leaderboard-item-image'><img src={FighterOne} /></div>
        <h1>MadMarkus</h1>
        <h1>RW#</h1>
        <h1>ko#</h1>
        <h1>Points 78000</h1>
        <h1>#1</h1>
      </div>


      <div className='leaderboardItem'>
       <div className='leaderboard-item-image'><img src={FighterOne} /></div>
        <h1>MadMarkus</h1>
        <h1>RW#</h1>
        <h1>ko#</h1>
        <h1>Points 78000</h1>
        <h1>#1</h1>
      </div>


      <div className='leaderboardItem'>
       <div className='leaderboard-item-image'><img src={FighterOne} /></div>
        <h1>MadMarkus</h1>
        <h1>RW#</h1>
        <h1>ko#</h1>
        <h1>Points 78000</h1>
        <h1>#1</h1>
      </div>


      

    </div>




    </div>






    </>
  )
}

export default Home
