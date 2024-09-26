import React, { useState } from 'react';
import "./AddTokensToWallet.css";
import { useSelector } from 'react-redux';

const AddTokensToWallet = () => {
    const user = useSelector((state) => state.user);
    const [customAmount, setCustomAmount] = useState(0);
    const [isCustomPopupVisible, setCustomPopupVisible] = useState(false);

    // Function to handle sending payment request
    const handlePayment = async (amount) => {
        try {
            const response = await fetch('https://fantasymmadness-game-server-three.vercel.app/api/make-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount,
                    userId: user._id, // Pass the user ID from the logged-in user
                }),
            });

            if (!response.ok) {
                throw new Error(`Payment error: ${response.statusText}`);
            }

            const data = await response.json();
            alert('Payment successful! Transaction details: ' + JSON.stringify(data.transaction));
        } catch (error) {
            console.error('Payment error:', error);
            alert('Payment failed, please try again.');
        }
    };

    // Function for handling custom amount
    const handleCustomPayment = () => {
        handlePayment(customAmount);
        setCustomPopupVisible(false);
    };

    return (
        <div className='membership-wrapper addTokensToWallet'>
            <div className='member-header'>
                <div className='member-header-image'>
                    <img src={user.profileUrl} alt="Profile" />
                </div>
                <h3><span className='toRemove'>Member Name:</span> {user.firstName} {user.lastName}</h3>
                <h3><span className='toRemove'>Current </span>Plan: {user.currentPlan}</h3>
            </div>

            <div className='mermbership-cards'>
                {/* 10 Tokens Package */}
                <div className='cardone'>
                    <h1 className='cardHeading'>10 Tokens</h1>
                    <div className='cardprice'>
                        <div className="ribbon"><span>Tokens</span></div>
                        <p>$</p>
                        <div className='cardprice-two'><h1>10</h1></div>
                        <p>00</p>
                    </div>
                    <div className='card-features'>
                        <li>Use on POT Fights</li>
                        <li>Tokens are added to wallet</li>
                        <li>Play and win prizes</li>
                        <li>Share fight portfolio</li>
                        <li>Get on the FMMA Leaderboard</li>
                    </div>
                    <button className='btn-grad' onClick={() => handlePayment(10)}>SELECT</button>
                </div>

                {/* 100 Tokens Package */}
                <div className='cardone'>
                    <h1 className='cardHeading'>100 Tokens</h1>
                    <div className='cardprice'>
                        <div className="ribbon"><span>Tokens</span></div>
                        <p>$</p>
                        <div className='cardprice-two'><h1>100</h1></div>
                        <p>00</p>
                    </div>
                    <div className='card-features'>
                        <li>Use on POT Fights</li>
                        <li>Tokens are added to wallet</li>
                        <li>Play and win prizes</li>
                        <li>Share fight portfolio</li>
                        <li>Get on the FMMA Leaderboard</li>
                    </div>
                    <button className='btn-grad' onClick={() => handlePayment(100)}>SELECT</button>
                </div>

                {/* Custom Tokens Package */}
                <div className='cardone'>
                    <h1 className='cardHeading'>Custom POT</h1>
                    <div className='cardprice'>
                        <div className="ribbon"><span>Tokens</span></div>
                        <div className='cardprice-two'><h1>$</h1></div>
                    </div>
                    <div className='card-features'>
                        <li>Use on POT Fights</li>
                        <li>Tokens are added to wallet</li>
                        <li>Play and win prizes</li>
                        <li>Share fight portfolio</li>
                        <li>Get on the FMMA Leaderboard</li>
                    </div>
                    <button className='btn-grad' onClick={() => setCustomPopupVisible(true)}>SELECT</button>
                </div>
            </div>

            {/* Custom Amount Popup */}
            {isCustomPopupVisible && (
                <div className="custom-popup">
                    <h2>Enter Custom Amount</h2>
                    <input 
                        type="number" 
                        value={customAmount} 
                        onChange={(e) => setCustomAmount(e.target.value)} 
                        placeholder="Enter custom amount" 
                    />
                    <button className="btn-grad" onClick={handleCustomPayment}>Submit</button>
                    <button className="btn-grad" onClick={() => setCustomPopupVisible(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default AddTokensToWallet;
