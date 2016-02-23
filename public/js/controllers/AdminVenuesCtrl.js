(function () {
  'use strict';

  angular
    .module('rms')
    .controller('AdminVenuesCtrl', ['venues', 'venueService', AdminVenuesCtrl]);

  function AdminVenuesCtrl (venues, venueService) {
    /* jshint validthis:true */
    
    this.venues = venues;

    this.submit = submit;

    function submit () {
      venueService.submit(this.newVenue);
    }
  }
}());
