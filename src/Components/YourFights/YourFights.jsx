import React from 'react'
import "./YourFights.css";
import Logoimage from "../../Assets/myimg.jpg";
import FighterOne from "../../Assets/fighterOne.png";
import FighterTwo from "../../Assets/fighterTwo.png";


const YourFights = () => {
  return (
    <div className='userdashboard yourFightsWrapper'>

      <div className='member-header'>
        <div className='member-header-image'>
          <img src={Logoimage} alt="Logo" />
        </div>
        <h3>Member Name - upgrade</h3>
        <h3>Current plan: None</h3>
      </div>
    
    
      <div className='fightwalletWrap'>
       
      <div className='totalPoints'>
                <h1>Your Total Points : <span style={{color:"#38b90c"}}>1000</span></h1>
                
            </div>
       
        <div className='fightWallet'>
        <h1><i className="fa fa-shopping-bag" aria-hidden="true"></i> Fight Wallet</h1>
        <h2>Tokens Remaining: <span>35</span></h2>
    </div>
</div>





<div className='fightsWrap'>

    <div className='completedFights fightscontainer'>
        <h1 className='fightsheadingtwo'>YOUR COMPLETED fights</h1>

        <div class="fightItem">
<div className='fightersImages'>
<div className='fighterOne'><img src={FighterOne} /></div>
<div className='fighterTwo'><img src={FighterTwo} /></div>
</div>

            <div className='fightItemOne'>
            <div class="transformed-div"> <h1>Player A -VS Player B</h1></div>
            <div class="transformed-div-two">
              <div className='transformed-div-two-partOne'>
                <h1>Your rank #2</h1>
              </div>
              <div className='transformed-div-two-partTwo'>
                <p>Points</p>
                <h1>676</h1>
              </div>


            </div>
            </div>
            <div className='fightItemTwo'>
            <div class="transformed-three">
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
            </div>
            <div class="transformed-div-four"><h1>Players</h1><p>400</p></div>
            </div>


            <div class="transformed-five">
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
            </div>
</div>
    </div>

    <div className='pendingFights fightscontainer'>
        <h1 className='fightsheadingthree'>Your pending fights</h1>

        
        <div class="fightItem">
<div className='fightersImages'>
<div className='fighterOne'><img src={FighterOne} /></div>
<div className='fighterTwo'><img src={FighterTwo} /></div>
</div>

            <div className='fightItemOne'>
            <div class="transformed-div"> <h1>Player A -VS Player B</h1></div>
            <div class="transformed-div-two">
              <div className='transformed-div-two-partOne'>
                <h1>6:00pm est</h1>
              </div>
              <div className='transformed-div-two-partTwo'>
                <p>Begins in 2 hours 42 min</p>
                
                </div>


            </div>
            </div>
            <div className='fightItemTwo'>
            <div class="transformed-three">
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
            </div>
            <div class="transformed-div-four"><h1>Players</h1><p>400</p></div>
            </div>


            <div class="transformed-five">
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
            </div>
</div>

    </div>
</div>
    </div>

  )
}

export default YourFights
