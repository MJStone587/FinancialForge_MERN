const User = require('../models/users');
const validator = require('validator');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' });
};

// RETRIEVE ALL USERS DATA
exports.get_all_users = async (req, res) => {
  try {
    const users = await User.find({}).sort({});
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: 'Something went wrong' });
  }
};

// CREATE NEW USER
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

  //email validation check - just a backup
  if (!validator.isEmail(email.toLowerCase())) {
    return res
      .status(400)
      .json({ error: 'Please use a valid email address', emptyFields });
  }

  //double check password strength
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({
      error: 'Your password is weak, please make it better',
      emptyFields,
    });
  }
  // check to make sure email is unique and not already registered
  const isDuplicate = await User.findOne({ email });
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
        email: email.toLowerCase(),
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
// LOGIN AUTHENTICATION
exports.user_login = async (req, res) => {
  const { email, password } = req.body;
  const emptyFields = [];
  if (!email) {
    emptyFields.push('email');
  }
  if (!password) {
    emptyFields.push('password');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all fields', emptyFields });
  }
  const emailExists = await User.findOne({ email });
  if (!emailExists) {
    return res
      .status(400)
      .json({ error: 'That email does not exist!', emptyFields });
  }
  bcrypt.compare(password, emailExists.password, function (err, result) {
    if (err) {
      return res.status(400).json({ error: err.message, emptyFields });
    }
    if (!result) {
      return res.status(400).json({ error: 'Incorrect Password', emptyFields });
    }
    const token = createToken(emailExists._id);
    const email = emailExists.email;
    return res.status(200).json({
      success: 'You have successfully logged in',
      emptyFields,
      token,
      email,
    });
  });
};
