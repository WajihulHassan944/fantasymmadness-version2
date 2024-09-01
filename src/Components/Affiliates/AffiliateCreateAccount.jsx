import React, { useState } from 'react';
import "../CreateAccount/CreateAccount.css";
import AffiliateThankyou from './AffiliateThankyou';  // Import Thankyou component
import ReCAPTCHA from "react-google-recaptcha";  // Import reCAPTCHA
import Logo1 from "../../Assets/FA.png";

const AffiliateCreateAccount = () => {
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
        affiliateImage: null,
    });
    const [isRegistered, setIsRegistered] = useState(false);
    const [buttonText, setButtonText] = useState('Register');  // State for button text
    const [recaptchaToken, setRecaptchaToken] = useState('');  // State for reCAPTCHA token

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (name === 'affiliateImage' && files.length > 0) {
            // If the user uploads an image, convert it to a URL and update the state
            const file = files[0];
            const imageUrl = URL.createObjectURL(file);

            setFormData((prevData) => ({
                ...prevData,
                affiliateImage: imageUrl, // Update the image preview
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
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
            const formDataToSend = new FormData();

            // Append other form data
            for (const key in formData) {
                if (key !== 'affiliateImage') {
                    formDataToSend.append(key, formData[key]);
                }
            }

            // Append the image file if it exists
            if (e.target.affiliateImage.files[0]) {
                formDataToSend.append('image', e.target.affiliateImage.files[0]);
            }

            const response = await fetch('https://fantasymmadness-game-server-three.vercel.app/registerAffiliate', {
                method: 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                setIsRegistered(true);
            } 
        } catch (error) {
            console.error('There was an error registering!', error);
        } finally {
            // Revert button text after registration
            setButtonText('Register');
        }
    };

    const clearPlayerName = () => {
        setFormData((prevData) => ({
            ...prevData,
            playerName: ''
        }));
    };

    if (isRegistered) {
        return <AffiliateThankyou />;  // Pass the dynamic response as prop to Thankyou
    }

    return (
        <div className='createAccount affiliateCreateAccount'>
            <div className='registerCard'>
                <h1>Affiliate Registration</h1>
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
                            <label>Desired Affiliate Name? <span>*</span></label>
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
                            <label>Your Phone<span className='toRemove'> (Mobile)</span> <span>*</span></label>
                            <input type='text' name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className='input-wrap-two'>
                        <div className='input-group' style={{flexBasis:'100%'}}>
                            <label>How did you hear about us? <span>*</span></label>
                            <input type='text' name="hearing" onChange={handleChange} required />
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

                    <div className='input-wrap-one specialDivInputs'>
                        <div className='input-group special-input-group'>
                            <img src={formData.affiliateImage || Logo1} alt="Affiliate Logo" style={{background:'#fff', border:'2px solid blue'}} />
                        </div>
                    </div>
                    <div className='input-wrap-one'>
                        <div className='input-group'>
                            <label>Profile Image <span>*</span></label>
                            <input type='file' name='affiliateImage' onChange={handleChange} />
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
                            <span className={`custom-radio ${formData.isUSCitizen ? 'checked' : ''}`}></span>
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
        </div>
    );
}
export default AffiliateCreateAccount;
