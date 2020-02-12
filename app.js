const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');

require('dotenv').config();
const app = express();

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SECRET_KEY]
  })
)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

require('./routes/auth')(app);
require('./routes/billing')(app);


// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// For Heroku - port env variable
const PORT = process.env.PORT || 5000
app.listen(PORT);
console.log("Server listening on port", PORT);


module.exports = app;