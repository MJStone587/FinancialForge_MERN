const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

let userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    validate: [isEmail, 'Please use a correct email address'],
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
// This static is here mostly for potential use after I look into it more. Hence not being used.
userSchema.statics.signup = async function (
  email,
  password,
  firstName,
  lastName
) {
  const emailDuplicate = await this.findOne({ email });
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
