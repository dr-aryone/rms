var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ConcertSchema = new Schema({
  tourName: String,
  venue: {
    type: Schema.Types.ObjectId,
    ref: 'Venue'
  },
  date: String,
  numericDate: Number,
  bands: [String]
});

ConcertSchema.methods.setNumericDate = function () {
  this.numericDate = Date.parse(new Date(this.date));
};

mongoose.model('Concert', ConcertSchema);
