var express = require('express'),
    router = express.Router();

var jwt = require('express-jwt'),
    auth = jwt({ secret: 'SECRET', userProperty: 'payload' });

var users = require('../controllers/users.js'),
    venues = require('../controllers/venues.js'),
    concerts = require('../controllers/concerts.js');

router.use(auth);

router
  .route('/users')
  .get(users.getAllUsers);

router
  .route('/users/:user')
  .get(users.getUser)
  .delete(users.deleteUser);

router
  .route('/users/:user/setadmin')
  .put(users.setUserAsAdmin);

router
  .route('/concerts')
  .post(concerts.addConcert);

router
  .route('/concerts/:concert')
  .put(concerts.updateConcert)
  .delete(concerts.deleteConcert);

router
  .route('/venues')
  .get(venues.getVenues);

router
  .route('/venues/:venue')
  .put(venues.updateVenue);

router.param('user', users.userParam);
router.param('concert', concerts.concertParam);
router.param('venue', venues.venueParam);

module.exports = router;
