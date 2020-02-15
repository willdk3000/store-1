const sendgrid = require('sendgrid');
const helper = sendgrid.mail;

// When we have es2015 class and call new,
// the first function automatically executed is
// the constructor function
class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(process.env.SENDGRID_KEY);
    this.from_email = new helper.Email('store@test.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);
    // addContent is a built in function of Mail class
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    // Map on email with ES2015 destructuring
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    const response = await this.sgApi.API(request);
    return response;
  }

}

module.exports = Mailer;