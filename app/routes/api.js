var express = require('express'),
    router = express.Router();

var venues = require('../controllers/venues.js'),
    concerts = require('../controllers/concerts.js');

router
  .route('/concerts')
  .get(concerts.getConcerts);

router
  .route('/concerts/:concert')
  .get(concerts.getConcert);

router
  .route('/venues')
  .get(venues.getVenues);

router
  .route('/venues/:venue')
  .get(venues.getVenue);

router.param('concert', concerts.concertParam);
router.param('venue', venues.venueParam);

module.exports = router;
