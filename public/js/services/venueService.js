(function () {
  'use strict';

  angular
    .module('rms')
    .factory('venueService', ['$http', 'authService', venueService]);

  function venueService ($http, authService) {
    var ret = {
      venues: [],
      getAll: getAll,
      getVenue: getVenue,
      submit: submit,
      update: update
    };

    var headers = { headers: { Authorization: 'Bearer ' + authService.getToken() } };

    function getAll () {
      return $http.get('/api/v1/venues', headers).then(function (data) {
        return angular.copy(data.data, ret.venues);
      });
    }

    function getVenue (venueId) {
      return $http.get('/api/v1/venues/' + venueId, headers).then(function (data) {
        return data.data;
      });
    }

    function submit (venue) {
      return $http.post('/api/v1/admin/venues', venue, headers).then(function (data) {
        venue.name = null;
        venue.address = null;
        venue.url = null;

        ret.venues.push(data.data);
      });
    }

    function update (venue) {
      return $http.put('/api/v1/admin/venues/' + venue._id, venue, headers);
    }

    return ret;
  }
}());
