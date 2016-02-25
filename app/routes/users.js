var express = require('express'),
    router = express.Router();

var jwt = require('express-jwt'),
    auth = jwt({ secret: 'SECRET', userProperty: 'payload' });

var users = require('../controllers/users.js'),
    concerts = require('../controllers/concerts.js');

router.use(auth);

router
  .route('/:user')
  .get(users.getUserInfo);

router
  .route('/:user/favorites')
  .put(users.saveConcert);

router
  .route('/:user/favorites/:concert')
  .delete(users.removeConcert);

router.param('user', users.userParam);
router.param('concert', concerts.concertParam);

module.exports = router;
