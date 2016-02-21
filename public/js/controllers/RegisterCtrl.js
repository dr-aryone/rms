(function () {
  'use strict';

  angular
    .module('writeAway')
    .controller('RegisterCtrl', ['authService', '$location', RegisterCtrl]);

  function RegisterCtrl (authService, $location) {
    this.register = register;
    this.user = {};

    function register (user) {
      authService.register(user).then(function () {
        $location.path('/');
      });
    }
  }
}());
