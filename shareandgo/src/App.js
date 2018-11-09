import React from 'react';
import {
BrowserRouter as Router,
Route,
} from 'react-router-dom';
import Home from './Components/Screens/Home';
import Login from './Components/Screens/Connexion/Login';
import UpdateAccount from './Components/Screens/Connexion/UpdateAccount';
import PostActivity from './Components/Screens/postActivity';
import MyActivities from './Components/Screens/MyActivities';
import SeeActivities from './Components/Screens/seeActivities';
import ConnexionPage from './Components/Screens/ConnexionPage';
import * as routes from './routes';
import isLoggedIn from './Reduceurs/login.reducer';
import user from './Reduceurs/user.reducer';
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';
const store = createStore(combineReducers({isLoggedIn, user}));




const App = () =>
<Provider store={store}>
  <Router>
    <div>
      <Route
      exact path={routes.HOME}
      component={() => <Home />}
      />
      <Route
      exact path={routes.PostActivity}
      component={() => <PostActivity />}
      />
      <Route
      exact path={routes.SeeActivities}
      component={() => <SeeActivities />}
      />
      <Route
      exact path={routes.ConnexionPage}
      component={() => <ConnexionPage />}
      />
      <Route
      exact path={routes.MyActivities}
      component={() => <MyActivities />}
      />
      <Route
      exact path={routes.UpdateAccount}
      component={() => <UpdateAccount />}
      />
    </div>
  </Router>
</Provider>

export default App;
