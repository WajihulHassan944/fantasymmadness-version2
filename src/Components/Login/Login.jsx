import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Navigate } from 'react-router-dom';
import { loginUser } from '../../Redux/authSlice';
import "./Login.css";
import logoimage from "../../Assets/logo.png";

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  if (isAuthenticated) {
    return <Navigate to="/UserDashboard" />;
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
