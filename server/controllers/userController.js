const User = require('../models/users');
const validator = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 12;

//Placeholder for potential user authentication and login
exports.get_all_users = async (req, res) => {
  try {
    const users = await User.find({}).sort({});
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: 'Something went wrong' });
  }
};

exports.post_new_user = async (req, res) => {
  // get data from input fields
  const { firstName, lastName, email, password } = req.body;
  // array for empty fields
  const emptyFields = [];
  //check if a field is missing and push to array
  if (!firstName) {
    emptyFields.push('firstName');
  }
  if (!lastName) {
    emptyFields.push('lastName');
  }
  if (!email) {
    emptyFields.push('email');
  }
  if (!password) {
    emptyFields.push('password');
  }

  // send error message and array to client if any field is missing
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all field', emptyFields });
  }

  // check to make sure email is unique and not already registered
  const isDuplicate = await User.findOne({ email: email });
  if (isDuplicate) {
    return res.status(400).json({
      error: 'That email is already registered, please try again',
      emptyFields,
    });
  }

  // hash and salt password for security
  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      return res.status(400).json({
        error: 'error: problem with your password please contact support',
        emptyFields,
      });
    }
    // if password was hashed correctly create new user document
    try {
      User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash,
      });
      return res
        .status(200)
        .json({ success: 'Success: New user created!', emptyFields });
    } catch (err) {
      return res.status(400).json({ error: err.message, emptyFields });
    }
  });
};

exports.user_login = async (req, res) => {
  const { email, password } = req.body;
  const emailExists = await User.findOne({ email: email });
  if (!emailExists) {
    return res.status(400).json({ error: 'That email does not exist!' });
  }
  bcrypt.compare(password, hash, function (err, result) {
    if (err) {
      return res.status(400).json({ error: 'Incorrect password' });
    }
  });
};
