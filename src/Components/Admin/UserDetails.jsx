import React, { useState, useEffect } from 'react';
import FighterOne from "../../Assets/fighterOne.png";

const UserDetails = ({ user }) => {
    const [showEmailTemplate, setShowEmailTemplate] = useState(false);
    const [emailStatus, setEmailStatus] = useState('');
    const [message, setMessage] = useState(`Dear ${user.firstName} ${user.lastName},\n\nWe are pleased to inform you that your request to become a Fantasy mmadness Affiliate User has been successfully confirmed. You can now enjoy the full benefits of our affiliate program.\n\nThank you for your continued support.\n\nBest regards,\nFantasy mmadness Team`);
    const [buttonText, setButtonText] = useState("Send Email");
    const [isVerified, setIsVerified] = useState(user.verified);

    useEffect(() => {
        if (isVerified) {
            setShowEmailTemplate(true);
        }
    }, [isVerified]);

    const handleApprove = async () => {
        try {
            const response = await fetch(`https://fantasymmadness-game-server-three.vercel.app/affiliates/${user._id}/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('User verified successfully');
                setIsVerified(true); // Update local state
                setShowEmailTemplate(true); // Show email template after verification
            } else {
                alert('Failed to verify user');
            }
        } catch (error) {
            console.error('Error verifying user:', error);
            alert('An error occurred while verifying the user');
        }
    };

    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        const emailData = {
            email: user.email,
            subject: 'Fantasy mmadness Affiliate User confirmation',
            message: message,
        };

        try {
            setButtonText("Sending!");
            const response = await fetch('https://fantasymmadness-game-server-three.vercel.app/send-email-affiliate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });

            if (response.ok) {
                setButtonText("Sent Successfully!");
                setEmailStatus('Email sent successfully');
            } else {
                setEmailStatus('Failed to send email');
                setButtonText("Failed to send email");
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setButtonText("Failed to send email");
            setEmailStatus('An error occurred while sending the email');
        }
    };

    return (
        <div className='affiliateUsersWrapper'>
            <h1 className='thirdHeadingOne'>User Details</h1>
    
            <div className='affiliateDetailsWrapper'>
                <div className='imgAffiliate'>
                    <img src={user.profileUrl || FighterOne} alt="User Profile" />
                </div>

                <div className='affiliateDetailsWrapperTwo'>
                    <h1>First Name: {user.firstName}</h1>
                    <h1>Last Name: {user.lastName}</h1>
                    <h1>Affiliate Name: {user.playerName}</h1>
                    <h1>{user.email}</h1>
                    <h1>{isVerified ? 'Approved' : 'Not Approved'}</h1> {/* Updated this line */}
                    <h1>Phone: {user.phone}</h1>
                    {!isVerified && (
                        <button className='approveButton' onClick={handleApprove}>Click To Approve</button>
                    )}
                </div>
            </div>

            {showEmailTemplate && (
                <div className='emailTemplateParent'>
                    <div className='emailTemplateWrapper'>
                        <h2>Email User Confirmation</h2>
                        <form className='emailForm' onSubmit={handleSubmitEmail}>
                            <div className='formGroup'>
                                <label htmlFor='email'>Email to:</label>
                                <input type='email' id='email' name='email' value={user.email} readOnly />
                            </div>

                            <div className='formGroup'>
                                <label htmlFor='subject'>Subject:</label>
                                <input type='text' id='subject' name='subject' value='Fantasy mmadness Affiliate User confirmation' readOnly />
                            </div>

                            <div className='formGroup'>
                                <label htmlFor='message'>Message:</label>
                                <textarea 
                                    id='message' 
                                    name='message' 
                                    rows='9' 
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>

                            <button type='submit' className='sendEmailButton'>{buttonText}</button>
                        </form>
                        {emailStatus && <p>{emailStatus}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDetails;