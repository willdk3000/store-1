const mongoose = require('mongoose');
const { Schema } = mongoose; // same as const Schema = mongoose.Schema

// Will create the users collection if it doesn't exist yet

const userSchema = new Schema({
  profileId: String,
  method: String,
  email: String,
  firstName: String,
  lastName: String,
  credits: Number
});

mongoose.model('users', userSchema);