var Concert = require('mongoose').model('Concert');

exports.addConcert = function (req, res, next) {
  var concert = new Concert(req.body);
  concert.setNumericDate();

  concert.save(function (err) {
    if (err) return next(err);

    Concert.populate(concert, { path: 'venue', model: 'Venue' }, function (err, concert) {
      return res.json(concert);
    });
  });
};

exports.updateConcert = function (req, res, next) {
  var concert = req.concert;

  concert.tourName = req.body.tourName || concert.tourName;
  concert.venue = req.body.venue || concert.venue;
  concert.date = req.body.date || concert.date;
  concert.bands = req.body.bands;

  if (req.body.date) {
    concert.numericDate = req.body.date;
    concert.setNumericDate();
  }

  concert.save(function (err) {
    if (err) return next(err);

    Concert.populate(concert, { path: 'venue', model: 'Venue' }, function (err, concert) {
      return res.json(concert);
    });
  });
}

exports.deleteConcert = function (req, res, next) {
  Concert.remove({ _id: req.concert._id }, function (err) {
    if (err) return next(err);
    return res.status(200).json({ message: 'Concert has been deleted' });
  });
};

exports.getConcerts = function (req, res, next) {
  Concert
    .find({})
    .populate('venue')
    .exec(function (err, concerts) {
      if (err) return next(err);
      return res.json(concerts);
    });
};

exports.getConcert = function (req, res, next) {
  Concert
    .findById(req.concert._id)
    .populate('venue')
    .exec(function (err, concert) {
      if (err) return next(err);
      return res.json(concert);
    });
}

exports.concertParam = function (req, res, next, id) {
  var query = Concert.findById(id);

  query.exec(function (err, concert) {
    if (err) return next(err);
    if (!concert) { return next(new Error('Can\'t find concert')); }

    req.concert = concert;

    return next();
  });
};
