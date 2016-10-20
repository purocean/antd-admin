// import VueRouter from 'vue-router'

// import Http404 from '../pages/Http404'
// import Http403 from '../pages/Http403'
// import Http500 from '../pages/Http500'

// import Login from '../pages/Login'
// import User from '../pages/User'
// import Auth from '../auth/auth'

// const routes = [
//   {name: 'home', path: '/', redirect: '/user'},
//   {name: 'login', path: '/login', component: Login},
//   {name: 'user', path: '/user', component: User},

//   {name: '403', path: '/403', component: Http403},
//   {name: '404', path: '/404', component: Http404},
//   {name: '500', path: '500', component: Http500}
// ]

// const router = new VueRouter({
//   routes
// })

// const allowList = ['/404', '/403', '/500', '/login', '/home']

// router.beforeEach((to, from, next) => {
//   if (allowList.indexOf(to.path) > -1) {
//     next()
//     return
//   }

//   if (Auth.isLogin()) {
//     Auth.can(to.path, allow => {
//       if (allow) {
//         next()
//       } else {
//         next({name: '403'})
//       }
//     })
//   } else {
//     next({name: 'login'})
//   }
// })

// export default router



import React from 'react';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';

import Auth from '../auth/Auth';

import Err from '../pages/Err';

// import Home from '../pages/Home';
import User from '../pages/User';
import Login from '../pages/Login';

const requireAuth = (prevState, nextState, replace, callback) => {
  const allowList = ['/404', '/403', '/500', '/login', '/'];
  const path = nextState.location.pathname;
  if (allowList.indexOf(path) > -1) {
    callback();
    return;
  }

  if (Auth.isLogin()) {
    Auth.can(path, allow => {
      if (allow) {
        callback();
      } else {
        replace({pathname: '/error'});
        callback();
      }
    })
  } else {
    replace({pathname: '/login', query: {redirect: path}});
    callback();
  }
};

class AppRouter extends React.Component {
  render() {
    return (
      <div>
        <Router history={hashHistory}>
          <Route path="/" onChange={requireAuth} onEnter={(nextState, replace, callback) => requireAuth(null, nextState, replace, callback)}>
            {/* <IndexRoute component={Home}/> */}
            <IndexRedirect to="/user" />
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

