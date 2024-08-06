import React, { useState } from 'react';
import "./CreateAccount.css";
import backgroundImg from "../../Assets/new-bg.png"

const CreateAccount = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isUSCitizen, setIsUSCitizen] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);

    const handleRadioChange = (setState) => () => {
        setState(prev => !prev);
    };

    return (
        <div className='createAccount'>
            <div className='registerCard'>
                <h1>Register for membership</h1>

                <div className='input-wrap-one'>
                    <div className='input-group'>
                        <label>First Name <span>*</span></label>
                        <input type='text' />
                    </div>
                    <div className='input-group'>
                        <label>Last Name <span>*</span></label>
                        <input type='text' />
                    </div>
                </div>

                <div className='input-wrap-two'>
                    <div className='input-group'>
                        <label>Desired Player Name? <span>*</span></label>
                        <input type='text' />
                    </div>
                    <i className="fa fa-refresh" aria-hidden="true"></i>
                </div>

                <div className='input-wrap-one'>
                    <div className='input-group'>
                        <label>Your Email <span>*</span></label>
                        <input type='text' />
                    </div>
                    <div className='input-group'>
                        <label>Your Phone (Mobile) <span>*</span></label>
                        <input type='text' />
                    </div>
                </div>

                <div className='input-wrap-one'>
                    <div className='input-group'>
                        <label>Zip Code <span>*</span></label>
                        <input type='text' />
                    </div>
                </div>

                <div className='termsConditions'>
                    <h2>Terms and conditions</h2>
                    <p>To play, users need to make predictions on fights. Points are awarded based on the accuracy of these predictions:
                        5 points for correctly picking the fight winner, 2 points for predicting the
                    </p>
                </div>

                <div className="checking" style={{backgroundColor:"#367cde", color:'#333'}}>
                    <label className="custom-radio-label">
                        <input
                            type="radio"
                            name="notifications"
                            checked={isChecked}
                            onChange={handleRadioChange(setIsChecked)}
                        />
                        <span className={`custom-radio ${isChecked ? 'checked' : ''}`}></span>
                        I would like to be sent activity notifications via SMS
                    </label>
                </div>

                <div className="checking">
                    <label className="custom-radio-label">
                        <input
                            type="radio"
                            name="subscribe"
                            checked={isSubscribed}
                            onChange={handleRadioChange(setIsSubscribed)}
                        />
                        <span className={`custom-radio ${isSubscribed ? 'checked' : ''}`}></span>
                        Subscribe to fmma E-list for updates and promotions
                    </label>
                </div>

                <div className="checking" style={{ backgroundColor: '#fff' }}>
                    <label className="custom-radio-label">
                        <input
                            type="radio"
                            name="usCitizen"
                            checked={isUSCitizen}
                            onChange={handleRadioChange(setIsUSCitizen)}
                        />
                        <span className={`custom-radio ${isUSCitizen ? 'checked' : ''}`}></span>
                        I am a US citizen and reside in the United States
                    </label>
                </div>

                <div className="checking">
                    <label className="custom-radio-label">
                        <input
                            type="radio"
                            name="agreeTerms"
                            checked={isAgreed}
                            onChange={handleRadioChange(setIsAgreed)}
                        />
                        <span className={`custom-radio ${isAgreed ? 'checked' : ''}`}></span>
                        I have read and agree to the terms and conditions
                    </label>
                </div>

               
                <button type="submit" className='btn-grad'>REGISTER</button>
            </div>




            <div className='backgrounfImg'>
                    <img src={backgroundImg} />
            </div>
        </div>
    );
}

export default CreateAccount;
