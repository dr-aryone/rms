var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    passport = require('passport');

module.exports = function () {
  var app = express();

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  app.set('views', './app/views');
  app.set('view engine', 'ejs');
  app.use(express.static('./public'));

  app.use(passport.initialize());

  var apiRoutes = require('../app/routes/api');
  app.use('/api/v1', apiRoutes);

  var protectedRoutes = require('../app/routes/protected');
  app.use('/api/v1/admin', protectedRoutes);

  var pageRoutes = require('../app/routes/pages');
  app.use('/', pageRoutes);

  var authRoutes = require('../app/routes/auth');
  app.use('/auth', authRoutes);

  return app;
};
