import React from 'react'
import { NavLink } from 'react-router-dom';
import logoimage from "../../Assets/logo.png";
import "./AdminLogin.css";
const AdminLogin = () => {
  return (
    <div className='adminLogin'>
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
<NavLink to="/" className="loginNavLink" >Move To Homepage</NavLink>
      </div>
    </div>

    </div>
  )
}

export default AdminLogin
