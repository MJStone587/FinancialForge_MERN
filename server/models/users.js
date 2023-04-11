const mongoose = require('mongoose');
const { isEmail } = require('validator');

const Schema = mongoose.Schema;

let UserSchema = new Schema({
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

/*UserSchema.virtual('url').get(function () {
  return '/catalog/user/' + this._id;
});
*/
module.exports = mongoose.model('User', UserSchema);
