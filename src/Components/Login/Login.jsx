import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { loginUser, fetchUser } from '../../Redux/authSlice';
import Membership from '../CreateAccount/Membership';
import "./Login.css";
import logoimage from "../../Assets/logo.png";
import ReCAPTCHA from "react-google-recaptcha";
import AffiliateLogin from '../Affiliates/AffiliateLogin';

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error, user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [planSelected, setPlanSelected] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [affiliatesLogin, setAffiliatesLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && !isAuthenticated) {
      dispatch(fetchUser(token));
    }
  }, [dispatch, isAuthenticated]);

  {/*useEffect(() => {
    if (user && user.currentPlan === 'None' && !planSelected && !alertShown) {
      alert('Please select a plan to access the dashboard.');
      setAlertShown(true);
    }
  }, [user, planSelected, alertShown]);
*/}
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!recaptchaToken) {
      alert("Please verify that you are not a robot.");
      return;
    }

    try {
      const resultAction = await dispatch(loginUser({ email, password }));
      const token = resultAction.payload?.token;
      
      if (token) {
        dispatch(fetchUser(token));
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };


  const handleGoogleSuccess = async (response) => {
    const { credential } = response;
    try {
      // Send the Google token to your backend API for verification and user handling
      const res = await fetch('https://fantasymmadness-game-server-three.vercel.app/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: credential, // Send the token here
        }),
      });
  
      if (!res.ok) {
        throw new Error('Google login failed');
      }
  
      const data = await res.json();
      console.log('Google login response:', data);
  
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        dispatch(fetchUser(data.token));  // Fetch the user info after successful login
      }
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  

  const handleGoogleError = () => {
    console.error('Google Login Failed');
  };

  if (user) {
    if (user.currentPlan === 'None' && !planSelected) {
      return <Membership email={user.email} onPlanSelected={() => setPlanSelected(true)} />;
    } else if (isAuthenticated) {
      return <Navigate to="/UserDashboard" />;
    }
  }

  const handleAffiliateLogin = () => {
    setAffiliatesLogin(true);
  };

  if (affiliatesLogin) {
    return <AffiliateLogin />;
  }

  return (
    <div className='login-wrapper'>
      <div className='loginCard' data-aos="zoom-in">
        <img src={logoimage} alt="Logo" />
        <h1>Please Login Below</h1>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder="Please enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Please enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className='toFlexDiv'>
            <div className='recaptcha-container'>
              <ReCAPTCHA
                sitekey="6LeLErwpAAAAAD3s3QWddvNAWULeDdLGUu3_-5lK"
                onChange={handleRecaptchaChange}
              />
            </div>
            
            <button className='btn-grad' type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <div className="google-login-wrapper">
  <GoogleLogin 
    onSuccess={handleGoogleSuccess} 
    onError={handleGoogleError}
  />
</div>

        <h2>- OR -</h2>

       
        <NavLink onClick={handleAffiliateLogin} className="loginNavLink">Affiliate? Click here</NavLink>
      </div>
    </div>
  );
};

export default Login;
