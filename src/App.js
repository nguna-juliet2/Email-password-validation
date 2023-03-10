
import { Switch, Route } from 'react-router-dom';

import Layout from './Componets/Layout/Layout';
import UserProfile from './Componets/Profile/UserProfile';
import AuthPage from './Pages/AuthPage';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        <Route path='/profile'>
          <UserProfile />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
