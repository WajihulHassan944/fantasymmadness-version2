import React from 'react'
import "./GlobalLeaderboard.css";
import FighterOne from "../../Assets/fighterOne.png";
import Logoimage from "../../Assets/myimg.jpg";
const GlobalLeaderboard = () => {
  return (
    <div className='fightDetails global-leaderboard'>
    

    <div className='member-header'>
        <div className='member-header-image'>
          <img src={Logoimage} alt="Logo" />
        </div>
        <h3>Member Name - upgrade</h3>
        <h3>Current plan: None</h3>
      </div>

      <div className='fightwalletWrap'>
        <div className='fightWallet'>
        <h1><i className="fa fa-shopping-bag" aria-hidden="true"></i> Fight Wallet</h1>
        <h2>Tokens Remaining: <span>35</span></h2>
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

    </div>
  )
}

export default GlobalLeaderboard
