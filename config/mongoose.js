var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function () {
  //var db = mongoose.connect(config.db);
  var db = mongoose.connect(db: 'mongodb://heroku_3pnv7czn:pijtp16q3acfab1a8tvnphc8cl@ds031947.mongolab.com:31947/heroku_3pnv7czn');

  require('../app/models/user');
  require('../app/models/concert');
  require('../app/models/venue');

  return db;
};
