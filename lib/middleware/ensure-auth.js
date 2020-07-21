const User = require('../models/User');

module.exports = (req, res, next) => {
  // console.log(req.cookies);
  const token = req.cookies.session;
  User
    .findByToken(token)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
};
