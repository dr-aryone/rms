(function () {
  'use strict';

  angular
    .module('rms')
    .controller('HomeCtrl', ['concerts', 'userService', 'concertService', HomeCtrl]);

  function HomeCtrl (concerts, userService, concertService) {
    this.concerts = concerts;

    this.isConcertToday = isConcertToday;
    this.removeConcert = removeConcert;
    this.saveConcert = saveConcert;

    function isConcertToday (concert) {
      return concertService.isConcertToday(concert);
    }

    function removeConcert (concert) {
      userService.removeConcert(concert);
      concert.isSaved = false;
    }

    function saveConcert (concert) {
      userService.saveConcert(concert);
      concert.isSaved = true;
    }
  }
}());
