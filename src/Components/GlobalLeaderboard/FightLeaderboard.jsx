import React from 'react'
import FighterOne from "../../Assets/fighterOne.png";
import Logoimage from "../../Assets/myimg.jpg";
import "./FightLeaderboard.css";
import FightTwo from "../../Assets/fighterTwo.png";
const FightLeaderboard = () => {
  return (
   <div className='fightLeaderboard'>
   <div className='fightDetails global-leaderboard'>
    

    <div className='member-header'>
        <div className='member-header-image'>
          <img src={Logoimage} alt="Logo" />
        </div>
        <h3>Member Name - upgrade</h3>
        <h3>Current plan: None</h3>
      </div>

     
      <div className='fightwalletWrap'>
       
      <div className='totalPoints'>
      <h1 className='fightTypeInFightDetails'>Fight type: <span>Boxing</span>
            - <span style={{color:"#38b90c"}}>Live </span> - <span>Fighter Name </span> VS <span> Fighter Name </span>
            </h1>
            <h1 style={{textAlign:'left'}}>POT: <span style={{color:"#38b90c"}}>10</span>
             &nbsp;Players: <span style={{color:"#38b90c"}}>500</span></h1>
   
            </div>
       
        <div className='fightWallet'>
        <h1><i className="fa fa-shopping-bag" aria-hidden="true"></i> Fight Wallet</h1>
        <h2>Tokens Remaining: <span>35</span></h2>
    </div>
</div>



    
    <div className='homeThird'>

    <div className='fightersImagesInFightDetails'>
         <div className='flexColumn'> <div className='imgWrapFights' style={{border:'none'}}><img src={FighterOne} style={{border:'3px solid blue'}} /></div>
         <h1 className='fightTypeInFightDetails'>Fighter Name</h1>
         </div>

          <h1>VS</h1>

          <div className='flexColumn'><div className='imgWrapFights' style={{border:'none'}}><img src={FightTwo} style={{border:'3px solid red'}} /></div>
          <h1 className='fightTypeInFightDetails'>Fighter Name</h1></div>
      </div>     
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
</div>
  )
}

export default FightLeaderboard
