const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient')

// RecipientSchema is a subdocument collection
// _user is the user to which user the survey is referenced to

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('surveys', surveySchema);