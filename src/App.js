
import { Switch, Route ,Redirect} from 'react-router-dom';
import { useContext } from 'react';
import Layout from './Componets/Layout/Layout';
import UserProfile from './Componets/Profile/UserProfile';
import AuthPage from './Pages/AuthPage';
import HomePage from './Pages/HomePage';
import AuthContext from './store/auth-context';

function App() {
const AuthCxt = useContext(AuthContext)
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!AuthCxt.isLoggedIn && (<Route path='/auth'>
          <AuthPage />
        </Route>)}
        <Route path='/profile'>
        {AuthCxt.isLoggedIn &&<UserProfile />}
        {!AuthCxt.isLoggedIn&& <Redirect to='/auth'/>}
        </Route>
        <Route path='*'>
          <Redirect to='/'/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
