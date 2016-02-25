(function () {
  'use strict';

  angular
    .module('rms')
    .factory('userService', ['$http', 'authService', userService]);

  function userService ($http, authService) {
    var ret = {
      favorites: [],
      userId: userId,
      getFavorites: getFavorites,
      removeConcert: removeConcert,
      saveConcert: saveConcert
    };

    var headers = { headers: { Authorization: 'Bearer ' + authService.getToken() } };

    function userId () {
      return authService.currentUser()._id;
    }

    function getFavorites () {
      return $http.get('/api/v1/users/' + ret.userId(), headers).then(function (data) {
        return angular.copy(data.data.favorites, ret.favorites);
      });
    }

    function removeConcert (concert) {
      return $http
              .delete('/api/v1/users/' + ret.userId() + '/favorites/' + concert._id, headers)
              .then(function (data) {
                ret.favorites.splice(ret.favorites.indexOf(concert), 1);
              });
    }

    function saveConcert (concert) {
      return $http.put('/api/v1/users/' + ret.userId() + '/favorites', concert, headers).then(function (data) {
        ret.favorites.push(data.data);
      });
    }

    return ret;
  }
}());
