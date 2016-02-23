(function () {
  'use strict';

  /* jshint validthis:true */

  angular
    .module('rms', ['ngRoute'])
    .run(function ($rootScope, $location, authService) {
      function isAdminRoute (route) {
        if (route.substring(0, 6) === '/admin') {
          return true;
        } else {
          return false;
        }
      }

      $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (isAdminRoute($location.url()) && !authService.isAdmin()) {
          $location.path('/');
        }
      });
    })
    .config(appRouter);

  function appRouter ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl:  'views/home.html',
        controller:   'HomeCtrl',
        controllerAs: 'home',
        resolve: {
          concerts: function (concertService) {
            return concertService.getAll();
          }
        }
      })
      .when('/admin/concerts', {
        templateUrl:  'views/admin/concerts.html',
        controller:   'AdminConcertsCtrl',
        controllerAs: 'ac',
        resolve: {
          concerts: function (concertService) {
            return concertService.getAll();
          },
          venues: function (venueService) {
            return venueService.getAll();
          }
        }
      })
      .when('/admin/concerts/:concertId', {
        templateUrl:  'views/admin/edit-concert.html',
        controller:   'EditConcertCtrl',
        controllerAs: 'ec',
        resolve: {
          concert: function ($route, concertService) {
            return concertService.getConcert($route.current.params.concertId);
          },
          venues: function (venueService) {
            return venueService.getAll();
          }
        }
      })
      .when('/admin/venues', {
        templateUrl:  'views/admin/venues.html',
        controller:   'AdminVenuesCtrl',
        controllerAs: 'av',
        resolve: {
          venues: function (venueService) {
            return venueService.getAll();
          }
        }
      })
      .when('/admin/venues/:venueId', {
        templateUrl:  'views/admin/edit-venue.html',
        controller:   'EditVenueCtrl',
        controllerAs: 'ev',
        resolve: {
          venue: function ($route, venueService) {
            return venueService.getVenue($route.current.params.venueId);
          }
        }
      })
      .when('/login', {
        templateUrl:  'views/login.html',
        controller:   'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/register', {
        templateUrl:  'views/register.html',
        controller:   'RegisterCtrl',
        controllerAs: 'reg'
      })
      .otherwise({ redirectTo: '/' });
  }
}());
