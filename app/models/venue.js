var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VenueSchema = new Schema({
  address: String,
  name: String,
  url: String
});

mongoose.model('Venue', VenueSchema);
