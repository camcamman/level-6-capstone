import React, { useContext, useState } from 'react';
import axios from 'axios';
import '../styles/LoginPage.css';
import { userContext } from '../authContext';
import { NavLink, Navigate } from 'react-router-dom';

function LoginPage() {
  // State variables to store the username, password, and whether or not to show the password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // State variable to determine whether the user is trying to log in or sign up
  const [isLogin, setIsLogin] = useState(true);

  // Access the login and signup functions from the authContext
  const { login, signup } = useContext(userContext);

  // Function to handle changes in the username input field
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Function to handle changes in the password input field
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Function to handle user sign up
  const handleSignup = async (credentials) => {
    try {
      await signup(credentials);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle user login
  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Credentials object containing the username and password
    const cred = {
      username: username,
      password: password,
    };

    // If the user is trying to log in, call the handleLogin function
    // Otherwise, call the handleSignup function
    if (isLogin) {
      handleLogin(cred);
    } else {
      handleSignup(cred);
    }
  };

  // Function to switch between login and sign up modes
  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setUsername('');
    setPassword('');
  };

  // Render the login/sign up form
  return (
    <div className="App">
      <div className="login-page-container">
        <h1 className="login-page-heading">{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              {isLogin ? 'Username' : 'Username'}
            </label>
            <input type="text" id="username" className="form-input" value={username} onChange={handleUsernameChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="password-input">
              <input type={showPassword ? 'text' : 'password'} id="password" className="form-input" value={password} onChange={handlePasswordChange} />
              <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
              </span>
            </div>
          </div>

          {/* Button to submit the form */}
          <button type="submit" className="btn btn-login">
            {isLogin ? 'Login' : 'Sign Up'}
            {/* If the user is already logged in, redirect*/}
          </button>
          
        </form>
        <p className="switch-text">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <span className="switch" onClick={handleSwitch}>
            {isLogin ? 'Sign up' : 'Log in'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
