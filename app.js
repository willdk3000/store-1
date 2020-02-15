const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();

/* Mongoose connection */
// DB has to be setup before passport to make sure we can access
// db when authorizing
// Fix deprecation
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
// Connect to mongo database
mongoose.connect(process.env.DATABASE_URL);
// Import mongoose schemas
require('./models/User')
/* ***************** */

// Passport config
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SECRET_KEY]
  })
)

// Backend routes
require('./routes/auth')(app);
require('./routes/billing')(app);

// Frontend routes
if (process.env.NODE_ENV === 'production') {

  //  Serve up react build if route found
  app.use(express.static('client/build'));

  // Serve up index.html for a route that is not found
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

// catch 404 and forwarding to error handler
// app.use(function (req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// For Heroku - port env variable
const PORT = process.env.PORT || 5000
app.listen(PORT);
console.log("Server listening on port", PORT);


module.exports = app;