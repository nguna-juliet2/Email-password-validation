import React, { useState, useEffect } from 'react';

import Login from './Componets/Login/Login';
import Home from './Componets/Home/Home';
import MainHeader from './Componets/MainHeder/MainHeader';

function App() {


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    const LoggedInInfro = localStorage.getItem('isLoggedIn')
    if (LoggedInInfro === '1'){
      setIsLoggedIn(true)
    }
  }, []);



  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1')
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };
 

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
