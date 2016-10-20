import Config from 'config';
import Storage from '../utils/Storage';
import Http from '../utils/Http';

let setUser = function (user) {
  return Storage.set('auth_user', user);
}

let getUser = function () {
  let user = Storage.get('auth_user', {});
  return (user && user.expires > Date.parse(new Date()) / 1000) ? user : {};
}

let getAccessToken = function () {
  return getUser().access_token;
}

let isLogin = function () {
  return !!getAccessToken()
}

let getPermissions = function () {
  return Storage.get('auth_permissions', [])
}

let setPermissions = function (permissions) {
  return Storage.set('auth_permissions', permissions)
}

let getRoles = function () {
  return Storage.get('auth_roles', [])
}

let setRoles = function (roles) {
  return Storage.set('auth_roles', roles)
}

let checkRole = function (role) {
  let roles = getRoles()
  return roles.indexOf(role) > -1
}

let checkPermission = function (permission) {
  let permissions = getPermissions()
  if (permissions.indexOf(permission) > -1) {
    return true
  }

  let pos = permission.lastIndexOf('/')
  while (pos > -1) {
    pos = permission.lastIndexOf('/')
    permission = permission.substring(0, pos)
    if (permissions.indexOf(permission + '/*') > -1) {
      return true
    }
  }

  return false
}

/**
 * Check from server if callback provided.
 */
let can = function (item, callback) {
  if (callback) {
    Http.fetch(Config.urls.userItems, {headers: {Authorization: 'Bearer ' + getAccessToken()}})
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          setRoles(Object.keys(data.roles))
          setPermissions(Object.keys(data.permissions))
          callback(checkRole(item) || checkPermission(item))
        })
      } else {
        console.log('Network response was not ok.')
      }
    })
    .catch(error => {
      console.log('There has been a problem with your fetch operation: ' + error.message)
    })
  } else {
    return checkRole(item) || checkPermission(item)
  }
}

export default {
  setUser,
  getUser,
  getAccessToken,
  getPermissions,
  setPermissions,
  getRoles,
  setRoles,
  checkPermission,
  checkRole,
  isLogin,
  can
}
