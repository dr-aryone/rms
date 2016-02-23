var Venue = require('mongoose').model('Venue');

exports.addVenue = function (req, res, next) {
  var venue = new Venue(req.body);

  venue.save(function (err) {
    if (err) return next(err);
    return res.json(venue);
  });
};

exports.getVenues = function (req, res, next) {
  Venue.find(function (err, venues) {
    if (err) return next(err);
    return res.json(venues);
  });
};

exports.getVenue = function (req, res, next) {
  Venue
    .findById(req.venue._id, function (err, venue) {
      if (err) return next(err);
      return res.json(venue);
    });
};

exports.updateVenue = function (req, res, next) {
  var venue = req.venue;

  venue.name = req.body.name || venue.name;
  venue.address = req.body.address || venue.address;
  venue.url = req.body.url || venue.url;

  venue.save(function (err) {
    if (err) return next(err);
    return res.json(venue);
  });
}

exports.venueParam = function (req, res, next, id) {
  var query = Venue.findById(id);

  query.exec(function (err, venue) {
    if (err) return next(err);
    if (!venue) { return next(new Error('Can\'t find venue')); }

    req.venue = venue;

    return next();
  });
};
