import React from 'react'
import "./AddTokensToWallet.css";
import { useSelector } from 'react-redux'; // Import useSelector to access Redux store

const AddTokensToWallet = () => {
    const user = useSelector((state) => state.user);
  
  return (
    <div className='membership-wrapper addTokensToWallet'>
      

      <div className='member-header'>
           <div className='member-header-image'> <img src={user.profileUrl} /></div>

           <h3><span className='toRemove'>Member Name:</span> {user.firstName} {user.lastName}</h3>
        <h3><span className='toRemove'>Current </span>Plan: {user.currentPlan} </h3>
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

                
     <button className='btn-grad' onClick={() => window.open("https://www.mymemberaccount.com/member-enrollment/11304", "_blank")}>SELECT</button>

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

                
     <button className='btn-grad' onClick={() => window.open("https://www.mymemberaccount.com/member-enrollment/11304", "_blank")}>SELECT</button>

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

                
     <button className='btn-grad' onClick={() => window.open("https://www.mymemberaccount.com/member-enrollment/11304", "_blank")}>SELECT</button>

            </div>


        </div>

    </div>
  )
}

export default AddTokensToWallet
