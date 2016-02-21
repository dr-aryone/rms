var User = require('mongoose').model('User'),
    passport = require('passport');

exports.getAllUsers = function (req, res, next) {
  User.find(function (err, users) {
    if (err) return nex(err);
    return res.json(users);
  });
};

exports.getUser = function (req, res, next) {
  User.findById({ _id: req.user._id }, function (err, user) {
    if (err) return next(err);
    return res.json(user);
  });
};

exports.createUser = function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }

  var user = new User(req.body);
  user.role = 'normal';
  user.setPassword(req.body.password);

  user.save(function (err) {
    if (err) return next(err);
    return res.json({ token: user.generateJWT() });
  });
};

exports.deleteUser = function (req, res, next) {
  User.remove({ _id: req.user._id }, function (err) {
    if (err) return next(err);
    return res.status(200).json({ message: 'User has been deleted' });
  });
};

exports.loginUser = function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }

  passport.authenticate('local', function (err, user, info) {
    if (err) return next(err);

    if (user) {
      return res.json({ token: user.generateJWT() });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
};

exports.setUserAsAdmin = function (req, res, next) {
  if (req.user) {
    var user = req.user;
    user.role = 'admin';
    user.save(function (err) {
      if (err) return next(err);
      res.send(user);
    });
  } else {
    return res.json({ error: 'No user was specified' });
  }
};

exports.userParam = function (req, res, next, id) {
  var query = User.findById(id);

  query.exec(function (err, user) {
    if (err) return next(err);
    if (!user) { return next(new Error('Can\'t find user')); }

    req.user = user;

    return next();
  });
};
