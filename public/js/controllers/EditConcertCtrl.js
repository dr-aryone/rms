(function () {
  'use strict';

  angular
    .module('rms')
    .controller('EditConcertCtrl', ['concert', 'venues', 'concertService', '$location', EditConcertCtrl]);

  function EditConcertCtrl (concert, venues, concertService, $location) {
    /* jshint validthis:true */
    
    this.concert = concert;
    this.venues = venues;

    this.submit = submit;

    this.concert.venueId = this.concert.venue._id;
    this.concert.bandsList = this.concert.bands.join(', ');

    function submit () {
      this.concert.bands = this.concert.bandsList.split(', ');
      this.concert.venue = this.concert.venueId;
      concertService.update(this.concert).then(function () {
        $location.path('/admin/concerts');
      });
    }
  }
}());
