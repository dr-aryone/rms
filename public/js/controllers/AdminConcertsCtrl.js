(function () {
  'use strict';

  angular
    .module('rms')
    .controller('AdminConcertsCtrl', ['concertService', 'concerts', 'venues', AdminConcertsCtrl]);

  function AdminConcertsCtrl (concertService, concerts, venues) {
    /* jshint validthis:true */
    
    this.concerts = concerts;
    this.venues = venues;

    this.newConcert = {};
    this.newConcert.venue = this.venues[0]._id;

    this.deleteConcert = deleteConcert;
    this.isOldConcert = isOldConcert;
    this.submit = submit;

    function deleteConcert (concert) {
      concertService.deleteConcert(concert);
    }

    function isOldConcert (concert) {
      var today = Date.parse(new Date());

      var date = new Date(concert.numericDate);
      date.setDate(date.getDate() + 1);
      date = Date.parse(date);

      return today > date;
    }

    function submit () {
      this.newConcert.bands = this.newConcert.bandsList.split(',');
      concertService.submit(this.newConcert);
    }
  }
}());
