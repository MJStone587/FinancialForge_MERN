const User = require('../models/users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Placeholder for potential user authentication and login
