(function () {
  'use strict';

  angular
    .module('rms')
    .controller('EditVenueCtrl', ['venue', 'venueService', '$location', EditVenueCtrl]);

  function EditVenueCtrl (venue, venueService, $location) {
    /* jshint validthis:true */
    
    this.venue = venue;

    this.submit = submit;

    function submit () {
      venueService.update(this.venue).then(function () {
        $location.path('/admin/venues');
      });
    }
  }
}());
