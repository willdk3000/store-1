const passport = require('passport');
const db = require('../config/db.js');
const users = db.get('users');

module.exports = (app) => {

  /* GOOGLE AUTH */
  app.get(
    '/auth/google', passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate("google"),
    (req, res) => {
      res.send(req.session.passport.user)
    }
  );

  app.get('/api/logout', (req, res) => {
    req.session = null
    res.send('Successfully logged out')
    //res.redirect('/')
  })

  app.get(
    '/api/getuser',
    async (req, res) => {
      try {
        let user = await users.findOne({ email: req.session.passport.user.email });
        res.send(user)
        //res.send(req.session.passport.user)
      }
      catch {
        res.send('No user logged in')
      }
    }
  );

  /* SECRET ROUTES*/
  function isUserAuthenticated(req, res, next) {
    try {
      if (req.session.passport.user) {
        next();
      }
    }
    catch {
      res.send('You must login to access secret routes!');
    }
  }

  app.get('/api/getsecret', isUserAuthenticated, (req, res) => {
    res.send({ cool: 1 });
  })

};