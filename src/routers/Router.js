import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Auth from '../auth/Auth';

import Err from '../pages/Err';
import Home from '../pages/Home';
import User from '../pages/User';
import Login from '../pages/Login';

class AppRouter extends React.Component {
  render() {
    return (
      <div>
        <Router history={hashHistory}>
          <Route
            path="/"
            onChange={Auth.requireAuth}
            onEnter={(nextState, replace, callback) => Auth.requireAuth(null, nextState, replace, callback)}
          >
            <IndexRoute component={Home}/>
            <Route path="login" component={Login} />
            <Route path="user" component={User} />
          </Route>
          <Route path="/error" component={Err} />
        </Router>
      </div>
    );
  }
}

AppRouter.defaultProps = {
};

export default AppRouter;

