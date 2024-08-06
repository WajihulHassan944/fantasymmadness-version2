import React from 'react'
import "./Membership.css"
import Logoimage from "../../Assets/myimg.jpg";
const Membership = () => {
  return (
    <div className='membership-wrapper'>
      
        <div className='member-header'>
           <div className='member-header-image'> <img src={Logoimage} /></div>

            <h3>Member Name - upgrade</h3>
            <h3>Current plan: None</h3>
        </div>


        <div className='mermbership-cards'>

            <div className='cardone'>
                <h1 className='cardHeading'>Standard membership</h1>

                <div className='cardprice'>
                <div className="ribbon">
        <span>Tokens</span>
    </div>
                    <p>$</p>
                    <div className='cardprice-two'>
                    <h1>10</h1>
                    <h2>Monthly</h2>
                    </div>
                    <p>00</p>
                </div>

                <div className='card-features'>
                    
                        <li>Access to dashboard</li>
                        <li>Tokens can accumulate</li>
                        <li>Play and win prizes</li>
                        <li>Share fight portfolio</li>
                        <li>Get on the FMMA Leaderboard</li>
                    
                </div>

                
     <button className='btn-grad'>SELECT</button>

            </div>


            <div className='cardone'>
                <h1 className='cardHeading'>Free membership</h1>

                <div className='cardprice'>
                <div className="ribbon">
        <span>1 Month</span>
    </div>
                    <div className='cardprice-two'>
                    <h1 style={{color:'#31da01'}}>FREE</h1>
                    <h2>First Month</h2>
                    </div>
                   </div>

                <div className='card-features'>
                    
                        <li>Access to dashboard</li>
                        <li>Play predict assigned fights</li>
                        <li>Get new fight updates</li>
                        
                </div>

                
     <button className='btn-grad'>SELECT</button>

            </div>
        </div>



    </div>
  )
}

export default Membership
