(function () {
  'use strict';

  angular
    .module('rms')
    .factory('authService', ['$http', '$window', authService]);

  function authService ($http, $window) {
    var auth = {
      currentUser: currentUser,
      getToken: getToken,
      isAdmin: isAdmin,
      isLoggedIn: isLoggedIn,
      login: login,
      logout: logout,
      register: register,
      saveToken: saveToken
    };

    function currentUser () {
      if (auth.isLoggedIn()) {
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload;
      }
    }

    function getToken () {
      return $window.localStorage['writeaway-token'];
    }

    function isAdmin () {
      if (auth.isLoggedIn()) {
        var role = auth.currentUser().role;
        return role === 'admin';
      }

      return false;
    }

    function isLoggedIn () {
      var token = auth.getToken();

      if (token) {
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    }

    function login (user) {
      return $http.post('/auth/login', user).success(function (data) {
        auth.saveToken(data.token);
      });
    }

    function logout () {
      $window.localStorage.removeItem('writeaway-token');
    }

    function register (user) {
      return $http.post('/auth/register', user).success(function (data) {
        auth.saveToken(data.token);
      });
    }

    function saveToken (token) {
      $window.localStorage['writeaway-token'] = token;
    }

    return auth;
  }
}());
