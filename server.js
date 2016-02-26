process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 3000;

var mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport');

var db = mongoose(),
    app = express(),
    passport = passport();

app.listen(process.env.PORT, function () {
  console.log('SLAAAAAAAYEEEEER!!!');
  console.log('The party is at http://localhost:' + process.env.PORT);
});
