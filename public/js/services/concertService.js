(function () {
  'use strict';

  angular
    .module('rms')
    .factory('concertService', ['$http', 'authService', 'userService', concertService]);

  function concertService ($http, authService, userService) {
    var ret = {
      concerts: [],
      deleteConcert: deleteConcert,
      getAll: getAll,
      getConcert: getConcert,
      getListing: getListing,
      isConcertToday: isConcertToday,
      isOldConcert: isOldConcert,
      submit: submit,
      update: update
    };

    var headers = { headers: { Authorization: 'Bearer ' + authService.getToken() } };

    function deleteConcert (concert) {
      return $http.delete('/api/v1/admin/concerts/' + concert._id, headers).then(function (data) {
        ret.concerts.splice(ret.concerts.indexOf(concert), 1);
      });
    }

    function getListing () {
      return userService.getFavorites().then(function (favorites) {
        return ret.getAll(favorites);
      });
    }

    function getAll (favorites) {
      return $http.get('/api/v1/concerts', headers).then(function (data) {
        favorites = favorites || [];
        angular.copy(data.data, ret.concerts);

        if (favorites.length) {
          var matches = [];
          favorites.forEach(function (favorite) {
            matches.push(_.findWhere(ret.concerts, { _id: favorite._id }));
          });

          matches.map(function (match) { match.isSaved = true; });
        }

        return ret.concerts;
      });
    }

    function getConcert (concertId) {
      return $http.get('/api/v1/concerts/' + concertId, headers).then(function (data) {
        return data.data;
      });
    }

    function isConcertToday (concert) {
      var today = new Date(),
          m = today.getMonth() + 1,
          d = today.getDate(),
          y = today.getFullYear();

      if (m < 10) { m = '0' + m; }
      if (d < 10) { d = '0' + d; }

      today = m + '-' + d + '-' + y;

      return today === concert.date;
    }

    function isOldConcert (concert) {
      var today = Date.parse(new Date());

      var date = new Date(concert.numericDate);
      date.setDate(date.getDate() + 1);
      date = Date.parse(date);

      return today > date;
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
