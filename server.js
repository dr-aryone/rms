process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport');

var db = mongoose(),
    app = express(),
    passport = passport();

app.listen(3000, function () {
  console.log('SLAAAAAAAYEEEEER!!!');
  console.log('The party is at http://localhost:3000');
});
