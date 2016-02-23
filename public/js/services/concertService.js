(function () {
  'use strict';

  angular
    .module('rms')
    .factory('concertService', ['$http', 'authService', concertService]);

  function concertService ($http, authService) {
    var ret = {
      concerts: [],
      deleteConcert: deleteConcert,
      getAll: getAll,
      getConcert: getConcert,
      submit: submit,
      update: update
    };

    var headers = { headers: { Authorization: 'Bearer ' + authService.getToken() } };

    function deleteConcert (concert) {
      return $http.delete('/api/v1/admin/concerts/' + concert._id, headers).then(function (data) {
        ret.concerts.splice(ret.concerts.indexOf(concert), 1);
      });
    }

    function getAll () {
      return $http.get('/api/v1/concerts', headers).then(function (data) {
        return angular.copy(data.data, ret.concerts);
      });
    }

    function getConcert (concertId) {
      return $http.get('/api/v1/concerts/' + concertId, headers).then(function (data) {
        return data.data;
      });
    }

    function submit (concert) {
      return $http.post('/api/v1/admin/concerts', concert, headers).then(function (data) {
        concert.tourName = null;
        concert.date = null;
        concert.venue = null;
        concert.bands = null;
        concert.bandsList = null;

        ret.concerts.push(data.data);
      });
    }

    function update (concert) {
      return $http.put('/api/v1/admin/concerts/' + concert._id, concert, headers);
    }

    return ret;
  }
}());
