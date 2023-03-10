import React, {useState} from "react";

const AuthContext = React.createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{},
});

const calculateRemainingTime =(experationTime)=>{
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(experationTime).getTime();
    const Remainingtime = adjExpirationTime-currentTime

    return Remainingtime
}

export const AuthContextProvider=(props)=>{
    const initialToken = localStorage.getItem('token')
    const [token, setToken]= useState(initialToken);
    const userIsLoggedIn = !!token;


    const  loginHandler =(token, experationTime)=>{
        setToken(token)
        localStorage.setItem('token', token);
        const Remainingtime = calculateRemainingTime(experationTime)
        setTimeout(logoutHandler, Remainingtime)
    };
    const logoutHandler =()=>{
        setToken(null)
        localStorage.removeItem('token');
    };

    const contexValue ={
        token:token,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler,
    }
    return(
        <AuthContext.Provider value={contexValue}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContext;