var mongoose = require('mongoose'),
    crypto = require('crypto'),
    jwt = require('jsonwebtoken'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
  },
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: 'Username is required',
    trim: true
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Concert'
  }],
  role: String,
  hash: String,
  salt: String,
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
  var today = new Date(),
      exp = new Date(today);

  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    role: this.role,
    exp: parseInt(exp.getTime() / 1000)
  }, 'SECRET');
};

mongoose.model('User', UserSchema);
