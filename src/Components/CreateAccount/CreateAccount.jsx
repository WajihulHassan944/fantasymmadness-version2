import React, { useState, useEffect } from 'react';
import "./CreateAccount.css";
import backgroundImg from "../../Assets/new-bg.png";
import Thankyou from './Thankyou';  // Import Thankyou component
import UploadAvatar from './UploadAvatar';  // Import UploadAvatar component
import ReCAPTCHA from "react-google-recaptcha";  // Import reCAPTCHA

const CreateAccount = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        playerName: '',
        email: '',
        phone: '',
        zipCode: '',
        isNotificationsEnabled: false,
        isSubscribed: false,
        isUSCitizen: false,
        isAgreed: false,
        password: '',
    });
    const [isRegistered, setIsRegistered] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [polling, setPolling] = useState(false);
    const [buttonText, setButtonText] = useState('Register');  // State for button text
    const [response, setResponse] = useState({});  // State for dynamic response
    const [pollingTimedOut, setPollingTimedOut] = useState(false);  // State for polling timeout
    const [recaptchaToken, setRecaptchaToken] = useState('');  // State for reCAPTCHA token

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleRecaptchaChange = (token) => {
        setRecaptchaToken(token);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!recaptchaToken) {
            alert("Please verify that you are not a robot.");
            return;
        }

        // Change button text to "Saving! Please wait"
        setButtonText('Saving! Please wait');

        try {
            const response = await fetch('https://fantasymmadness-game-server-three.vercel.app/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.text();
            if (response.ok) {
                setIsRegistered(true);
                setPolling(true);  // Start polling for verification
                setResponse({
                    title: 'Thank you for registering!',
                    message: 'Please check your email to verify your account and complete the registration process.'
                });  // Set dynamic response for success
            } else {
                setResponse({
                    title: 'Registration Failed',
                    message: data || 'There was an error registering. Please try again.'
                });  // Set dynamic response for failure
            }
        } catch (error) {
            console.error('There was an error registering!', error);
            setResponse({
                title: 'Registration Failed',
                message: 'There was an error registering. Please try again.'
            });  // Set dynamic response for catch block
        } finally {
            // Revert button text after registration
            setButtonText('Register');
        }
    };

    useEffect(() => {
        if (polling && formData.email) {
            const interval = setInterval(async () => {
                try {
                    const userResponse = await fetch(`https://fantasymmadness-game-server-three.vercel.app/user/${formData.email}`);
                    const userData = await userResponse.json();
                    if (userResponse.ok && userData.verified) {
                        setIsVerified(true);
                        setPolling(false);  // Stop polling
                    }
                } catch (error) {
                    console.error('Error checking verification status', error);
                }
            }, 5000);  // Poll every 5 seconds

            // Set a timeout to stop polling after 2 minutes
            const timeout = setTimeout(() => {
                setPolling(false);  // Stop polling after 2 minutes
                setPollingTimedOut(true);  // Set polling timeout flag
            }, 120000);  // 2 minutes = 120000 milliseconds

            // Clean up interval and timeout on component unmount or if polling is stopped
            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }
    }, [polling, formData.email]);

    useEffect(() => {
        if (pollingTimedOut) {
            setResponse({
                title: 'Verification Failed',
                message: 'You did not verify your email within the allowed time. Please try registering again.'
            });
        }
    }, [pollingTimedOut]);

    const clearPlayerName = () => {
        setFormData((prevData) => ({
            ...prevData,
            playerName: ''
        }));
    };

    if (isVerified) {
        return <UploadAvatar email={formData.email} />;  // Pass email as prop to UploadAvatar
    }

    if (isRegistered || pollingTimedOut) {
        return <Thankyou response={response} />;  // Pass the dynamic response as prop to Thankyou
    }

    return (
        <div className='createAccount'>
            <div className='registerCard'>
                <h1>Register for membership</h1>
                <form onSubmit={handleSubmit}>
                    {/* Form Fields */}
                    <div className='input-wrap-one'>
                        <div className='input-group'>
                            <label>First Name <span>*</span></label>
                            <input type='text' name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div className='input-group'>
                            <label>Last Name <span>*</span></label>
                            <input type='text' name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className='input-wrap-two'>
                        <div className='input-group'>
                            <label>Desired Player Name? <span>*</span></label>
                            <input type='text' name="playerName" value={formData.playerName} onChange={handleChange} required />
                        </div>
                        <i className="fa fa-refresh" aria-hidden="true" onClick={clearPlayerName}></i>
                    </div>

                    <div className='input-wrap-one'>
                        <div className='input-group'>
                            <label>Your Email <span>*</span></label>
                            <input type='email' name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className='input-group'>
                            <label>Your Phone (Mobile) <span>*</span></label>
                            <input type='text' name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className='input-wrap-one'>
                        <div className='input-group'>
                            <label>Zip Code <span>*</span></label>
                            <input type='text' name="zipCode" value={formData.zipCode} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className='input-wrap-one'>
                        <div className='input-group'>
                            <label>Password <span>*</span></label>
                            <input type='password' name="password" value={formData.password} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className='termsConditions'>
                        <h2>Terms and conditions</h2>
                        <p>I will add later.</p>
                    </div>

                    <div className="checking" style={{ backgroundColor: "#367cde", color: '#333' }}>
                        <label className="custom-radio-label">
                            <input
                                type="checkbox"
                                name="isNotificationsEnabled"
                                checked={formData.isNotificationsEnabled}
                                onChange={handleChange}
                            />
                            <span className={`custom-radio ${formData.isNotificationsEnabled ? 'checked' : ''}`}></span>
                            I would like to be sent activity notifications via SMS
                        </label>
                    </div>

                    <div className="checking">
                        <label className="custom-radio-label">
                            <input
                                type="checkbox"
                                name="isSubscribed"
                                checked={formData.isSubscribed}
                                onChange={handleChange}
                            />
                            <span className={`custom-radio ${formData.isSubscribed ? 'checked' : ''}`}></span>
                            Subscribe to fmma E-list for updates and promotions
                        </label>
                    </div>

                    <div className="checking" style={{ backgroundColor: '#fff' }}>
                        <label className="custom-radio-label">
                            <input
                                type="checkbox"
                                name="isUSCitizen"
                                checked={formData.isUSCitizen}
                                onChange={handleChange}
                            />
                            <span className={`custom-radio ${formData.isUSCitizen ? 'checked' : ''



}`}></span>
                            I am a US citizen and reside in the United States
                        </label>
                    </div>

                    <div className="checking">
                        <label className="custom-radio-label">
                            <input
                                type="checkbox"
                                name="isAgreed"
                                checked={formData.isAgreed}
                                onChange={handleChange}
                            />
                            <span className={`custom-radio ${formData.isAgreed ? 'checked' : ''}`}></span>
                            I have read and agree to the terms and conditions
                        </label>
                    </div>

                    <ReCAPTCHA
                        sitekey="6LeLErwpAAAAAD3s3QWddvNAWULeDdLGUu3_-5lK"
                        onChange={handleRecaptchaChange}
                    />

                    <button type="submit" className='btn-grad' style={{ minWidth: '37%' }}>{buttonText}</button>
                </form>
            </div>

            <div className='backgrounfImg'>
                <img src={backgroundImg} alt="Background" />
            </div>
        </div>
    );
}

export default CreateAccount;
