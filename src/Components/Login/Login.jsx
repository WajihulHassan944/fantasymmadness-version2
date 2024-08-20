import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';
import { loginUser, fetchUser } from '../../Redux/authSlice';
import Membership from '../CreateAccount/Membership'; // Import the Membership component
import "./Login.css";
import logoimage from "../../Assets/logo.png";

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error, user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [planSelected, setPlanSelected] = useState(false); // New state for re-render
  const [alertShown, setAlertShown] = useState(false); // State to control alert display

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && !isAuthenticated) {
      // Fetch the user data if token exists and user is not authenticated
      dispatch(fetchUser(token));
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (user && user.currentPlan === 'None' && !planSelected && !alertShown) {
      alert('Please select a plan to access the dashboard.');
      setAlertShown(true); // Ensure alert is only shown once
    }
  }, [user, planSelected, alertShown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch login action
      const resultAction = await dispatch(loginUser({ email, password }));
      const token = resultAction.payload?.token;
      
      if (token) {
        // If token is present, fetch the user details
        dispatch(fetchUser(token));
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  // Check if user is authenticated and has a valid plan
  if (user) {
    if (user.currentPlan === 'None') {
      if (!planSelected) {
        return <Membership email={user.email} onPlanSelected={() => setPlanSelected(true)} />; // Pass setPlanSelected to Membership
      }
    } else if (isAuthenticated) {
      return <Navigate to="/UserDashboard" />; // Redirect to UserDashboard
    }
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
          <button className='btn-grad' type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <h2>- OR -</h2>
        <NavLink to="/CreateAccount" className="loginNavLink">Create your account</NavLink>
      </div>
    </div>
  );
};

export default Login;
