import React from 'react'
import RewardTokens from "../../Assets/reward-freetokens.png";
import RewardAdmin from "../../Assets/reward-admin.png";
import RewardPot from "../../Assets/reward-pot.png";
import "./Sponsors.css";
const Rewards = () => {
    return (
        <div className='sponsors-wrap' style={{background:'#fff'}}>
        <img src="https://ufcfightclub.com/assets/ufc2/patterns/double_black_top_right.svg" alt="design" className='toabsolutedesign'/>
        
          <h1 style={{textTransform:'uppercase'}}>Membership Has Its Perks! 
          <img src="https://ufcfightclub.com/assets/ufc2/patterns/brackets.svg" alt='img' /></h1>
          <h2 style={{textTransform:'uppercase'}}>Why Wait? Start Today!</h2>
    
    <div className='rewards-container-parent'>
        
        <p className='reward-description'>Become a member to gain access to ultimate benefits.</p>
        
        <div className='reward-items-wrap'>        
        
        <div className='reward-item'>
            <div className='reward-image'>
                <img src={RewardPot} alt='reward' />
                <div className='rewardAbsolute'>
                <h2>WINNER Award</h2>
                <p>As specified</p>
                </div>
            </div>
            <h3>Upto $10,000</h3>
        </div>
    


    
        <div className='reward-item'>
            <div className='reward-image'>
                <img src={RewardAdmin} alt='reward' />
                <div className='rewardAbsolute'>
                <h2>ADMIN Award</h2>
                <p>As specified</p>
                </div>
            </div>
            <h3>Upto $200</h3>
        </div>
    


    
        <div className='reward-item'>
            <div className='reward-image'>
                <img src={RewardTokens} alt='reward' />
                <div className='rewardAbsolute'>
                <h2>FREE tokens</h2>
                <p>As specified</p>
                </div>
            </div>
            <h3>Free $20 on account creation</h3>
        </div>
    


        </div>

    </div>  </div>
      )
    }
    

export default Rewards
