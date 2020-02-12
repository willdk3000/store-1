const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('../config/db.js');
const users = db.get('users');

module.exports = (app) => {

  /* Secret routes checker*/
  function isUserAuthenticated(req, res, next) {
    try {
      if (req.session.passport.user) {
        next();
      }
    }
    catch {
      res.send('You must login to access this route!');
    }
  }


  /* STRIPE */
  app.post('/api/sendStripeToken', isUserAuthenticated, async (req, res) => {
    //console.log(req.body)
    const charge = await stripe.charges.create(
      {
        amount: 500,
        currency: 'usd',
        source: req.body.token.id,
        description: 'My First Test Charge (created for API docs)',
      })
    //console.log(charge);
    let currentCredits = req.session.passport.user.credits
    currentCredits += 5;
    const user = await users.findOneAndUpdate(
      { email: req.session.passport.user.email },
      { $set: { credits: currentCredits } })
    res.send(user);
  })

}