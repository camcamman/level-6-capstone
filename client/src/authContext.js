import { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Create a new context instance
export const userContext = createContext();

// Create an Axios instance with an authorization header
const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Define the AuthContext component that will provide the user context to the application
export default function AuthContext(props) {
  // Define a userState object with a token, user object, and error message
  const [userState, setUserState] = useState({
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || {},
    errMsg: '',
  });

  // Define a function to handle authentication errors and update the state with an error message
  const handleAuthErr = errMsg => {
    setUserState(prevUserState => ({
      ...prevUserState,
      errMsg,
    }));
  };

  // Define a function to sign up a new user
  const signup = credentials => {
    axios.post('/auth/signup', credentials)
      .then(res => {
        const { user, token } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token,
        }));
        console.log(userState);
      })
      .catch(err => handleAuthErr(err.response.data.errMsg));
  };

  // Define a function to log in an existing user
  const login = credentials => {
    axios.post('/auth/login', credentials)
      .then(res => {
        const { user, token } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token,
        }));
        console.log(userState);
      })
      .catch(err => handleAuthErr(err.response.data.errMsg));
  };

  // Define a function to log out the current user
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserState({
      user: {},
      token: '',
    });
  };

  // Provide the user context to the application through the userContext Provider
  return (
    <userContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
}

// Usage:
// import { userContext } from './AuthContext';
// const { user, token, signup, login, logout } = useContext(userContext);
