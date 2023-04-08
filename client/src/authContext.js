import { createContext, useContext, useState } from 'react';
import axios from 'axios';

export const userContext = createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function AuthContext (props) {

    // localStorage.setItem("user", JSON.stringify(user))

    const initState = { 
        token: localStorage.getItem("token") || "",
        user: localStorage.getItem("user") || {}, 
        errMsg: ""
    }

    const [userState, setUserState] = useState(initState)

    function handleAuthErr(errMsg){
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg
        }))
    }

    function signup(credentials){
        axios.post('/auth/signup', credentials)
        .then(res => {
            const { user, token } = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user: user, 
                token
            }))
            console.log(userState)
        })
      .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    
    function login(credentials){
        axios.post("/auth/login", credentials)
          .then(res => {
            const { user, token } = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => ({
              ...prevUserState,
              user,
              token
            }))
            console.log(userState)
          })
      .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
          user: {},
          token: "",
        })
    }

    function handleAuthErr(errMsg){
        setUserState(prevState => ({
          ...prevState,
          errMsg
        }))
      }
    
      function resetAuthErr(){
        setUserState(prevState => ({
          ...prevState,
          errMsg: ""
        }))
      }
      return(
        <AuthContext.Provider
            value={{
                ...userState,
                signup,
                login,
                logout,
            }}>
            {props.children}
        </AuthContext.Provider>
    )
// }
}

// const AuthContext = createContext({
//   user: null,
//   login: () => {},
//   logout: () => {},
//   signup: () => {},
// });

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = async (credentials) => {
//     try {
//       const response = await axios.post('/auth/login', credentials);
//       const { token, user } = response.data;
//       localStorage.setItem('token', token);
//       setUser(user);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   const signup = async (credentials) => {
//     try {
//       const response = await axios.post('/auth/signup', credentials);
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, signup }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => useContext(AuthContext);

// export { AuthProvider, useAuth };









// import axios from "axios";
// const { createContext, useState } = require("react");



//     return(
//         <userContext.Provider
//             value={{
//                 ...userState,
//                 signup,
//                 login,
//                 logout,
//             }}>
//             {props.children}
//         </userContext.Provider>
//     )
// }