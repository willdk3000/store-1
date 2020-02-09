const passport = require('passport');

module.exports = (app) => {

  /* GOOGLE AUTH */
  app.get(
    '/auth/google', passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate("google"),
    (req, res) => {
      res.send(req.user)
    }
  );

  app.get('/api/logout', (req, res) => {
    req.session = null
    //res.send({ User: req.user })
    res.redirect('/')
  })

  app.get(
    '/api/getuser',
    (req, res) => {
      try {
        res.send(req.session.passport.user)
      }
      catch {
        res.send('No user')
      }
    }
  );

};