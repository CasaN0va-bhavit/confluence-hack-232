const passport = require('passport')

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else res.redirect('/login');
  }

function forwardAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/home')
    } 
}

module.exports = {ensureAuthenticated, forwardAuthenticated}