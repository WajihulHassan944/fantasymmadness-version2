import React from 'react'
import Logoimage from "../../Assets/myimg.jpg";
import FighterOne from "../../Assets/fighterOne.png";
import FightTwo from "../../Assets/fighterTwo.png";

const PurchaseTokensIntimation = () => {
  return (
    <div className='fightCosting'>
        
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
    
      <div className='fightersImagesInFightDetails'>
          <div className='imgWrapFights'><img src={FighterOne} /></div>
          <h1>VS</h1>
          <div className='imgWrapFights'><img src={FightTwo} /></div>
      </div>
      <h1 className='fightTypeInFightDetails'><span>Fighter Name </span> &nbsp;  <span> Fighter Name </span></h1>

      <div className='beiginningTimeFight'>
          <h1>Will Begin in - </h1>
          <p style={{color:"#38b90c"}}>00:22:14</p>
          </div>


          <h1 className='fightTypeInFightDetails'>
          This Fight Costs <span style={{color:'violet'}}> 5 tokens </span> to play
          </h1>

          <h1 className='fightTypeInFightDetails'>
          You have <span style={{color:'#ffc000'}}> 3 tokens </span> in your wallet <i className="fa fa-circle" style={{color:'yellow', fontSize:'30px'}}></i>
          </h1>

          <div className='fightDetailsPot'>
              <h1>Click below to purchase more tokens</h1>
             
          </div>

          
          <button className='btn-grad'>
          <i className="fa fa-circle" style={{color:'yellow'}}></i> Purchase</button>
</div>
<p className='note'>You must make predictions atleast 10 minutes before the  fight starts or they will not be used when the fight starts</p>

  </div>
  )
}

export default PurchaseTokensIntimation
