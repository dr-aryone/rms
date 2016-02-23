(function () {
  'use strict';

  angular
    .module('rms')
    .controller('NavbarCtrl', ['authService', '$location', NavbarCtrl]);

  function NavbarCtrl (authService, $location) {
    this.getUsername = getUsername;
    this.isAdmin = isAdmin;
    this.isLoggedIn = isLoggedIn;
    this.logout = logout;

    function getUsername () {
      var userInfo = authService.currentUser();
      return userInfo.username;
    }

    function isAdmin () {
      return authService.isAdmin();
    }

    function isLoggedIn () {
      return authService.isLoggedIn();
    }

    function logout () {
      authService.logout();
      $location.path('/login');
    }
  }
}());
