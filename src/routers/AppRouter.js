import NProgress from 'nprogress';
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Auth from '../auth/Auth';

import Err from '../pages/Err';
import Home from '../pages/Home';
import User from '../pages/User';
import Login from '../pages/Login';

const requireAuth = (prevState, nextState, replace, callback) => {
  NProgress.start();
  const allowList = ['/404', '/403', '/500', '/login', '/'];
  const path = nextState.location.pathname;
  if (allowList.indexOf(path) > -1) {
    callback();
    NProgress.done();
    return;
  }

  if (Auth.isLogin()) {
    Auth.can(path, allow => {
      if (allow) {
        callback();
        NProgress.done();
      } else {
        replace({pathname: '/error'});
        callback();
        NProgress.done();
      }
    })
  } else {
    replace({pathname: '/login', query: {redirect: path}});
    callback();
    NProgress.done();
  }
};

class AppRouter extends React.Component {
  render() {
    return (
      <div>
        <Router history={hashHistory}>
          <Route path="/" onChange={requireAuth} onEnter={(nextState, replace, callback) => requireAuth(null, nextState, replace, callback)}>
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

