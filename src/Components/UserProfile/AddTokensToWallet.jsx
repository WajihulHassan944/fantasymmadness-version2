import React from 'react'
import "./AddTokensToWallet.css";
import Logoimage from "../../Assets/myimg.jpg";
const AddTokensToWallet = () => {
  return (
    <div className='membership-wrapper addTokensToWallet'>
      

      <div className='member-header'>
           <div className='member-header-image'> <img src={Logoimage} /></div>

            <h3>Member Name - upgrade</h3>
            <h3>Current plan: None</h3>
        </div>


        <div className='mermbership-cards'>

            <div className='cardone'>
                <h1 className='cardHeading'>10 Tokens</h1>

                <div className='cardprice'>
                <div className="ribbon">
        <span>Tokens</span>
    </div>
                    <p>$</p>
                    <div className='cardprice-two'>
                    <h1>10</h1>
                   
                    </div>
                    <p>00</p>
                </div>

                <div className='card-features'>
                    
                        <li>Use on POT Fights</li>
                        <li>Tokens are added to wallet</li>
                        <li>Play and win prizes</li>
                        <li>Share fight portfolio</li>
                        <li>Get on the FMMA Leaderboard</li>
                    
                </div>

                
     <button className='btn-grad'>SELECT</button>

            </div>

            <div className='cardone'>
                <h1 className='cardHeading'>100 Tokens</h1>

                <div className='cardprice'>
                <div className="ribbon">
        <span>Tokens</span>
    </div>
                    <p>$</p>
                    <div className='cardprice-two'>
                    <h1>100</h1>
                    </div>
                    <p>00</p>
                </div>

                <div className='card-features'>
                    
                        <li>Use on POT Fights</li>
                        <li>Tokens are added to wallet</li>
                        <li>Play and win prizes</li>
                        <li>Share fight portfolio</li>
                        <li>Get on the FMMA Leaderboard</li>
                    
                </div>

                
     <button className='btn-grad'>SELECT</button>

            </div>






            <div className='cardone'>
                <h1 className='cardHeading'>Custom POT</h1>

                <div className='cardprice'>
                <div className="ribbon">
        <span>Tokens</span>
    </div>
                    <div className='cardprice-two'>
                    <h1>$</h1>
                    </div>
                </div>

                <div className='card-features'>
                    
                        <li>Use on POT Fights</li>
                        <li>Tokens are added to wallet</li>
                        <li>Play and win prizes</li>
                        <li>Share fight portfolio</li>
                        <li>Get on the FMMA Leaderboard</li>
                    
                </div>

                
     <button className='btn-grad'>SELECT</button>

            </div>


        </div>

    </div>
  )
}

export default AddTokensToWallet
