import React from 'react'
import "./FightDetails.css";
import Logoimage from "../../Assets/myimg.jpg";
import FighterOne from "../../Assets/fighterOne.png";
import FightTwo from "../../Assets/fighterTwo.png";
const FightDetails = () => {
  return (
    <div className='fightDetails'>
      
      
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


<div className='fightDetailsContainer'>
        <h1 className='fightDetailsContainerFirstHeading'>Fight: <span>Fight TiTLE</span></h1>

        <div className='fightersImagesInFightDetails'>
            <div className='imgWrapFights'><img src={FighterOne} /></div>
            <h1>VS</h1>
            <div className='imgWrapFights'><img src={FightTwo} /></div>
        </div>

            <h1 className='fightTypeInFightDetails'>Fight type: <span>Boxing</span>
            - <span className='makeGreen'>Live </span> - <span>Fighter Name </span> VS <span> Fighter Name </span>
            </h1>

            <div className='fightDetailsPot'>
                <h1>POT :</h1>
                <p style={{color:"#38b90c"}}>$1000.00</p>
            </div>

            <div className='beiginningTimeFight'>
            <h1>Will Begin in - </h1>
            <p style={{color:"#38b90c"}}>00:22:14</p>
            </div>

            <button className='btn-grad'>EDIT YOUR PREDICTIONS?</button>
</div>
    </div>
  )
}

export default FightDetails
