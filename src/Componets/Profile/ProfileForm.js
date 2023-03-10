import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';


const ProfileForm = () => {
  const history = useHistory();
  const NewPasswordInputRef = useRef();
  
const AuthCtx=useContext(AuthContext);


  const submitHandler =(event)=>{
    event.preventDefault();
    const NewEnterPassword=  NewPasswordInputRef.current.value
    // validation
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB6CSF_DC0bWHS0fJq_gRg_pA_7btshOW0',{
      method: 'POST',
      body:JSON.stringify({
        idToken:AuthCtx.token,
        password:NewEnterPassword,
        returnSecureToken:false

      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((res)=>{
      history.replace('/auth')
    })
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={NewPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
