const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const mongoose = require("mongoose");
const User = mongoose.model('users');

const requireLogin = require('../middlewares/requireLogin')

module.exports = (app) => {

  /* STRIPE */
  /* Buy credits */
  app.post('/api/sendStripeToken', requireLogin, async (req, res) => {
    //console.log(req.body)
    const charge = await stripe.charges.create(
      {
        amount: 500,
        currency: 'cad',
        source: req.body.token.id,
        description: 'My First Test Charge (created for API docs)',
      })
    let currentCredits = req.body.user.credits;
    currentCredits += 5;
    const user = await User.findOneAndUpdate(
      { email: req.session.passport.user.email },
      { $set: { credits: currentCredits } })
    res.send(user);
  })


  /* Check credit total */
  app.get(
    '/api/getcredits',
    requireLogin,
    async (req, res) => {
      let user = await User.findOne({ email: req.session.passport.user.email });
      res.send(user);
    }
  );


}

