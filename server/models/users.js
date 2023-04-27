const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

let userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: [5, 'Password must be at least 5 characters long'],
    required: true,
  },
});

// static method for signup
// is there a benefit to doing this in user model vs in the controller method?
// This static is here mostly for potential use after I look into it more.
userSchema.statics.signup = async function (
  email,
  password,
  firstName,
  lastName
) {
  if (!email || !password || firstName || lastName) {
    throw Error('You must fill out all fields');
  }
  //validate email
  if (!validator.isEmail(email.toLowerCase())) {
    throw Error('Please use a valid email address');
  }

  //check password strength
  if (!validator.isStrongPassword(password)) {
    throw Error(
      'Your password is weak, please include at least one capital letter, one special character, and one number'
    );
  }

  const emailDuplicate = await this.findOne({ email: email.toLowerCase() });
  if (emailDuplicate) {
    throw Error('Email already registered');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    email,
    password: hash,
    firstName,
    lastName,
  });
  return user;
};

module.exports = mongoose.model('User', userSchema);
