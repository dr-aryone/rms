var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function () {
  //var db = mongoose.connect(config.db);
  console.log(process.env.MONGOLAB_URI);
  var db = mongoose.connect(process.env.MONGOLAB_URI);

  require('../app/models/user');
  require('../app/models/concert');
  require('../app/models/venue');

  return db;
};
