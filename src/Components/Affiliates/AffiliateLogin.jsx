import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';
import { loginAffiliate, fetchAffiliate } from '../../Redux/affiliateAuthSlice';
import logoimage from "../../Assets/logo.png";
import ReCAPTCHA from "react-google-recaptcha";  // Import reCAPTCHA
import { toast } from 'react-toastify';
import Login from '../Login/Login';

const AffiliateLogin = () => {
    const dispatch = useDispatch();
    const { isAuthenticatedAffiliate, loading,  userAffiliate } = useSelector((state) => state.affiliateAuth);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [recaptchaToken, setRecaptchaToken] = useState('');  // State for reCAPTCHA token
    const [usersLogin, setUsersLogin] = useState(false);
    const [alertShown, setAlertShown] = useState(false); // State to control alert display
    const [showPassword, setShowPassword] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);  // New state for forgot password
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    

    

    
    useEffect(() => {
      const token = localStorage.getItem('affiliateAuthToken');
      if (token && !isAuthenticatedAffiliate) {
        // Fetch the user data if token exists and user is not authenticated
        dispatch(fetchAffiliate(token));
      }
    }, [dispatch, isAuthenticatedAffiliate]);
  
  
    const handleRecaptchaChange = (token) => {
      setRecaptchaToken(token);
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!recaptchaToken) {
      toast.error("Please verify that you are not a robot."); // Replacing alert with toast error
      return;
    }
  
    const loginAffiliatePromise = new Promise(async (resolve, reject) => {
      try {
        // Dispatch login action
        const resultAction = await dispatch(loginAffiliate({ email, password }));
        const token = resultAction.payload?.token;
  
        if (token) {
          // If token is present, fetch the affiliate details
          dispatch(fetchAffiliate(token));
          setAlertShown(false); // Reset alert if shown previously
          resolve(); // Resolve promise on successful login
        } else {
          reject(new Error('Login failed. Please check your credentials.')); // Reject on failed login
        }
      } catch (error) {
        console.error('Login failed', error);
        reject(new Error('An error occurred during login.')); // Reject on network error
      }
    });
  
    // Use toast.promise to handle pending, success, and error states
    toast.promise(loginAffiliatePromise, {
      pending: 'Logging in...',
      success: 'Login successful 👌',
      error: {
        render({ data }) {
          return data.message || 'Login failed';
        }
      }
    });
  };
  



    useEffect(() => {
      if (userAffiliate && !userAffiliate.verified && !alertShown) {
        alert('Please wait for your affiliate status approval from admin.');
        setAlertShown(true); // Ensure alert is only shown once
      }
    }, [userAffiliate, alertShown ]);
  




    const handleUserLogin = () => {
        setUsersLogin(true);
    };

   
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

    


  // Check if user is authenticated and has a valid plan
  if (userAffiliate) {
    if (!userAffiliate.verified) {
      console.log("Please wait for your affiliate status approval from admin");
    } else if (isAuthenticatedAffiliate) {
      return <Navigate to="/AffiliateDashboard" />; // Redirect to UserDashboard
    }
  }

    if(usersLogin){
      return <Login />;
    }





    const handleForgotPasswordSubmit = async (e) => {
      e.preventDefault();
      if (!forgotPasswordEmail) {
        toast.error('Please enter your email');
        return;
      }
      try {
        // Call the forgot password API
        const response = await fetch('https://fantasymmadness-game-server-three.vercel.app/forgotPassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: forgotPasswordEmail }),
        });

        if (response.ok) {
          toast.success('Password reset email sent');
        } else {
          toast.error('Email not found');
        }
      } catch (error) {
        console.error('Error sending reset email', error);
        toast.error('Server error');
      }
    };

    if (forgotPassword) {
      return (
        <div className='login-wrapper'>
          <div className='loginCard'>
            <img src={logoimage} alt="Logo" />
            <h1>Forgot Password</h1>
            <form onSubmit={handleForgotPasswordSubmit}>
              <input
                type='email'
                placeholder="Enter your email to reset password"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                required
              />
              <button className='btn-grad' type="submit">
                Send Reset Link
              </button>
            </form>
            <NavLink onClick={() => setForgotPassword(false)} className="loginNavLink">
              Back to Login
            </NavLink>
          </div>
        </div>
      );
    }








    return (
      <div className='login-wrapper'>
        <div className='loginCard'>
          <img src={logoimage} alt="Logo" />
          <h1>Please Login Below</h1>
  
  
          <form onSubmit={handleSubmit}>
            <input
              type='email'
              placeholder="Please enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        
        <div style={{ position: 'relative', marginBottom: '20px' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder='Please enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ paddingRight: '40px' }} // Add padding to make space for the icon
        />
        <span 
          onClick={togglePasswordVisibility} 
          style={{
            position: 'absolute',
            top: '20.5px',
            right: '15px',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            
          }}
        >
          <i className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} aria-hidden="true" style={{fontWeight:'700'}}></i>
        </span>
      </div>

        
        
         <div className='toFlexDiv'>  
    <div className='recaptcha-container'>
      <ReCAPTCHA
        sitekey="6LeLErwpAAAAAD3s3QWddvNAWULeDdLGUu3_-5lK"
        onChange={handleRecaptchaChange}
      />
    </div>
    
    <button className='btn-grad' type="submit" disabled={loading} >
      {loading ? '...' : 'Login'}
    </button>
    </div>
  
          </form>
          <p
            style={{ marginTop: '-20px', color: '#fff', marginBottom: '20px', cursor: 'pointer' }}
            onClick={() => setForgotPassword(true)}
          >
            Forgot your password? Click here
          </p>  <h2>- OR -</h2>
          <NavLink onClick={handleUserLogin} className="loginNavLink">Public User? Click here</NavLink>
        </div>
      </div>
    );
  };
  
export default AffiliateLogin
