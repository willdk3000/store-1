const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const User = mongoose.model('users');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = (app) => {

  app.get('/api/surveyThanks', (req, res) => {
    res.send('Thanks for the feedback!')
  })


  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {

    const { title, subject, body, recipients } = req.body.survey;

    // When key and value are the same,
    // we can specify only 1 of the 2 (ES6)
    // underscore indicates a relationship field
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.session.passport.user.id,
      dateSent: Date.now()
    })

    // Send email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.session.passport.user.credits -= 1;
      const user = await User.findOneAndUpdate(
        { profileId: req.session.passport.user.profileId },
        { credits: req.session.passport.user.credits })
      return res.send(user);
    }
    catch (err) {
      res.status(422).send(err);
    }
  })

}