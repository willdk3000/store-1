const passport = require('passport');

const mongoose = require("mongoose");
const User = mongoose.model('users');

const requireLogin = require('../middlewares/requireLogin')

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
        let user = await User.findOne({ email: req.session.passport.user.email });
        res.send(user)
        //res.send(req.session.passport.user)
      }
      catch {
        res.send('No user logged in')
      }
    }
  );

  /* SECRET ROUTES*/
  app.get('/api/getsecret', requireLogin, (req, res) => {
    res.send({ cool: 1 });
  })

};