(function () {
  'use strict';

  angular
    .module('rms')
    .controller('DashboardCtrl', ['favorites', 'userService', 'concertService', DashboardCtrl]);

  function DashboardCtrl (favorites, userService, concertService) {
    this.favorites = favorites;

    this.isConcertToday = isConcertToday;
    this.isOldConcert = isOldConcert;
    this.removeConcert = removeConcert;

    function isConcertToday (concert) {
      return concertService.isConcertToday(concert);
    }

    function isOldConcert (concert) {
      return concertService.isOldConcert(concert);
    }

    function removeConcert (concert) {
      userService.removeConcert(concert);
    }
  }
}());
