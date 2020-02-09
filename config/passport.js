const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const db = require('../config/db.js');
const users = db.get('users');

//GOOGLE STRATEGY - for first login and setting cookie

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
      //userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      //scope: ['email']
    },
    async (accessToken, refreshToken, profile, done) => {

      const existingUser = await users.findOne({ profileid: profile.id })

      if (existingUser) {
        console.log("User found in DB!");
        return done(null, existingUser);
      }
      const newUser = {
        method: 'google',
        profileid: profile.id,
        email: profile.emails[0].value,
        prenom: profile.name.givenName,
        nom: profile.name.familyName,
      }
      const user = await users.insert(newUser)
      console.log("User created!")
      return done(null, user);
      ;
    }
  ));