import React from 'react'
import { NavLink } from 'react-router-dom';
import "./Login.css";
import logoimage from "../../Assets/logo.png";

const Login = () => {
  return (
    <div className='login-wrapper'>
      <div className='loginCard'>

<img src={logoimage} />
<h1>Please Login Below</h1>

<form>
  <input type='email' placeholder="Please enter your email" />
  <input type='password' placeholder='Please enter your password' />

  <button className='btn-grad'>Login</button>
</form>

<h2>- OR -</h2>
<NavLink to="/CreateAccount" className="loginNavLink" >Create your account</NavLink>
      </div>
    </div>
  )
}

export default Login
