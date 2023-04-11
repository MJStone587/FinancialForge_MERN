const User = require('../models/users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
  const { firstName, lastName, email, password } = req.body;
  const emptyFields = [];
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

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all field', emptyFields });
  }

  const isDuplicate = await User.findOne({ email: email });
  if (isDuplicate) {
    return res
      .status(400)
      .json({
        error: 'That email is already registered, try again',
        emptyFields,
      });
  }

  const hashedPass = await bcrypt.hash(password, saltRounds);
  if (hashedPass) {
    try {
      User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPass,
      });
      return res
        .status(200)
        .json({ success: 'Success: New user created!', emptyFields });
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Something not working', emptyFields });
    }
  }
};

exports.user_login = async (req, res) => {
  const { email, password } = req.body;
  const emailExists = await User.findOne({ email: email });
  if (!emailExists) {
    return res.status(400).json({ error: 'That email does not exist!' });
  }
};
