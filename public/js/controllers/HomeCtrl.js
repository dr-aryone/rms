(function () {
  'use strict';

  angular
    .module('rms')
    .controller('HomeCtrl', ['concerts', HomeCtrl]);

  function HomeCtrl (concerts) {
    this.concerts = concerts;

    this.isConcertToday = isConcertToday;

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
  }
}());
