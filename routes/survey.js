const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = (app) => {

  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {

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
    mailer.send();
    return res.send('Mail sent!');
  })

}