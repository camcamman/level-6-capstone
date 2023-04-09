import { createContext, useContext, useState } from 'react';
import axios from 'axios';

export const userContext = createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function AuthContext(props) {
  const [userState, setUserState] = useState({
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || {},
    errMsg: '',
  });

  const handleAuthErr = errMsg => {
    setUserState(prevUserState => ({
      ...prevUserState,
      errMsg,
    }));
  };

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

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserState({
      user: {},
      token: '',
    });
  };

  const resetAuthErr = () => {
    setUserState(prevState => ({
      ...prevState,
      errMsg: '',
    }));
  };

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
