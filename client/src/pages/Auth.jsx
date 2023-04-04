import React, { useState } from 'react';
import '../styles/LoginPage.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
  };

  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="App">
        <div className="login-page-container">
        <h1 className="login-page-heading">{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
            <label htmlFor="username" className="form-label">{isLogin ? 'Username' : 'Email'}</label>
            <input type="text" id="username" className="form-input" value={username} onChange={handleUsernameChange} />
            </div>
            <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="password-input">
                <input type={showPassword ? 'text' : 'password'} id="password" className="form-input" value={password} onChange={handlePasswordChange} />
                <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                </span>
            </div>
            </div>
            <button type="submit" className="btn btn-login">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <p className="switch-text">{isLogin ? "Don't have an account?" : 'Already have an account?'}
            <span className="switch" onClick={handleSwitch}>{isLogin ? 'Sign up' : 'Log in'}</span>
        </p>
        </div>
    </div>
  );
}

export default App;
