const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const mongoose = require("mongoose");
const User = mongoose.model('users');

//GOOGLE STRATEGY

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
    },
    async (accessToken, refreshToken, profile, done) => {

      const existingUser = await User.findOne({ profileId: profile.id });

      if (existingUser) {
        console.log("User found in DB!");
        return done(null, existingUser);
      }

      const user = await new User({
        method: 'google',
        profileId: profile.id,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        credits: 0
      }).save();

      console.log("User created!")
      return done(null, user);
    }
  ));