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


};