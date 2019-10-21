import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import NewUserFlow from '../components/NewUserFlow';
import WordsGoIn from '../components/WordsGoIn';
import FillTheGapsPrep from '../components/FillTheGapsPrep';

export const history = createHistory();

// private routes are only available to logged in users

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <Route path="/new-user" component={NewUserFlow} />
        <PrivateRoute path="/words-go-in" component={WordsGoIn} />
        <PrivateRoute path="/fill-gaps-p" component={FillTheGapsPrep} />

        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
