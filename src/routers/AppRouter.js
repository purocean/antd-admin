import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Auth from '../auth/Auth';

import Err from '../pages/Err';
import Login from '../mobile/Login';

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
            <Route path="login" component={Login} />
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

