import React from 'react'
import Logoimage from "../../Assets/myimg.jpg";
import FighterOne from "../../Assets/fighterOne.png";
import FightTwo from "../../Assets/fighterTwo.png";

const AffiliateMatchDetails = () => {
    return (
        <div className='fightDetails'>
          
          
          <div className='member-header' style={{marginBottom:'30px'}}>
            <div className='member-header-image'>
              <img src={Logoimage} alt="Logo" />
            </div>
            <h3>Affiliate Name - Wajih ul Hassan</h3>
            <h3>Balance: $2500</h3>
          </div>
    
    
    
    <div className='fightDetailsContainer'>
            <h1 className='fightDetailsContainerFirstHeading'>Fight: <span>Fight TiTLE</span></h1>
    
            <div className='fightersImagesInFightDetails'>
                <div className='imgWrapFights'><img src={FighterOne} /></div>
                <h1>VS</h1>
                <div className='imgWrapFights'><img src={FightTwo} /></div>

            </div>
            
            <div className='fightDetailsPot'>
                    <h1 style={{background:'#e90000', padding:'5px 10px', fontSize:'22px'}}>This fight is pending admin approval.</h1>
            </div>

            <div className='fightDetailsPot'>
                    <h1 style={{color:'#ebcd03', fontSize:'22px'}}>You will be notidied via email when your fight has been approved.</h1>
            </div>


                <h1 className='fightTypeInFightDetails' style={{fontSize:'21.5px'}}>Fight type: <span>Boxing</span>
                - <span style={{color:'#3fd50b'}}>Shadow </span> - <span>Fighter Name </span> VS <span> Fighter Name </span>
                </h1>
    
                <div className='fightDetailsPot'>
                    <h1>POT :</h1>
                    <p style={{color:"#38b90c"}}>$1000.00</p>
                </div>
    
                <div className='beiginningTimeFight'>
                <h1 style={{fontSize:'21.5px'}}>Will Begin in - 12/1/2024 - </h1>
                <p style={{color:"#38b90c"}}>00:22:14</p>
                </div>
    


                <div className='fightDetailsPot'>
                    <h1 style={{fontSize:'21.5px'}}>Fight promotion url below <span>Click to copy</span></h1>
                 </div>
                <div className='fightDetailsPot'>
                    <h1 style={{color:'#8abafe', fontSize:'21.5px'}}>https://fantasymmadness.com/affiliate/fight-title</h1>
                </div>

<div style={{width:'100%', display:'flex', gap:'20px', flexWrap:'wrap', justifyContent:'center', alignItems:'center'}}>
                <button className='btn-grad' style={{width:'14%'}}>Delete Fight</button>
                <button className='btn-grad' style={{width:'14%'}}>Dashboard</button>
                </div>
    </div>
        </div>
      )
    }
    
export default AffiliateMatchDetails
