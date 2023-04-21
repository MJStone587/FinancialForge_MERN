const jwt = require('jsonwebtoken');
const User = require('../models/users');

exports.requireAuth = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: 'Authorization required' });
  }
  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findById({ _id }).select('_id');
    next();
  } catch (err) {
    if (err.name == 'TokenExpiredError' && err.message == 'jwt expired') {
      console.log('Token has expired');
      res
        .status(401)
        .json({ error: 'Your token has expired please log in again' });
    }
    res.status(401).json({ error: 'Authorization denied!' });
  }
};
