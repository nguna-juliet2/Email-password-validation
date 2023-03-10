import { useState, useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';

import classes from './AuthForm.module.css';

 
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const[isLoading, setIsLoading]= useState(false)
  const emailInputRef= useRef()
  const passwordInputRef= useRef()

  const authCtx=useContext(AuthContext)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  
const signupHandler = (event)=>{
  event.preventDefault();
  const enterEmail= emailInputRef.current.value;
  const enterPassword = passwordInputRef.current.value
  setIsLoading(true)
  let url;
  if(isLogin){
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB6CSF_DC0bWHS0fJq_gRg_pA_7btshOW0'
  }else{
      url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB6CSF_DC0bWHS0fJq_gRg_pA_7btshOW0'
  }
    fetch(url,{
      method: 'POST',
      body:JSON.stringify({
        email:enterEmail,
        password:enterPassword,
        returnSecureToken:true
      }),
      headers:{
        'Content-Type':'application/json'
      }
    }).then(res =>{
      setIsLoading(false)
      if((res).ok){
          return res.json();
      }else{
        return res.json().then((data) =>{
           let errormesage= 'Authication failed';
           
           throw new Error(errormesage);
        });
      }
    }).then((data) =>{
      authCtx.login(data.idToken) ;




    }).catch(err =>{
      alert(err.message);
    })
  
}

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={signupHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required  ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading&&<p>Sending request</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
