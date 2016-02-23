(function () {
  'use strict';

  angular
    .module('rms')
    .filter('upcoming', [upcoming]);

  function upcoming () {
    function isDatePassed (concertDate) {
      var today = Date.parse(new Date());

      var date = new Date(concertDate);
      date.setDate(date.getDate() + 1);
      date = Date.parse(date);

      return today > date;
    }

    return function (items, displayOld) {
      if (displayOld) {
        return items;
      }

      var results = [];

      items.forEach(function (item) {
        if (!isDatePassed(item.date)) {
          results.push(item);
        }
      });

      return results;
    };
  }
}());
