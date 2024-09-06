import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';
import { loginAffiliate, fetchAffiliate } from '../../Redux/affiliateAuthSlice';
import logoimage from "../../Assets/logo.png";
import ReCAPTCHA from "react-google-recaptcha";  // Import reCAPTCHA
import Login from '../Login/Login';

const AffiliateLogin = () => {
    const dispatch = useDispatch();
    const { isAuthenticatedAffiliate, loading, error, userAffiliate } = useSelector((state) => state.affiliateAuth);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [recaptchaToken, setRecaptchaToken] = useState('');  // State for reCAPTCHA token
    const [usersLogin, setUsersLogin] = useState(false);
    const [alertShown, setAlertShown] = useState(false); // State to control alert display
  
    

    

    
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
        alert("Please verify that you are not a robot.");
        return;
    }
  
      try {
        // Dispatch login action
        const resultAction = await dispatch(loginAffiliate({ email, password }));
        const token = resultAction.payload?.token;
        
        if (token) {
          // If token is present, fetch the user details
          dispatch(fetchAffiliate(token));
        }

        setAlertShown(false);
       
      } catch (error) {
        console.error('Login failed', error);
        
       
      }
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
    return (
      <div className='login-wrapper'>
        <div className='loginCard'>
          <img src={logoimage} alt="Logo" />
          <h1>Please Login Below</h1>
  
          {error && <p className="error">{error}</p>} {/* Display any errors */}
  
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
    
    <button className='btn-grad' type="submit" disabled={loading} >
      {loading ? 'Logging in...' : 'Login'}
    </button>
  </div>
  
          </form>
  
          <h2>- OR -</h2>
          <NavLink onClick={handleUserLogin} className="loginNavLink">Public User? Click here</NavLink>
        </div>
      </div>
    );
  };
  
export default AffiliateLogin
