const jwt = require("jsonwebtoken");
const User = require("../models/users");

exports.requireAuth = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization required" });
  }
  const token = authorization.split(" ")[1];
  //process.env.SECRET
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findById({ _id }).select("_id");
    next();
  } catch (err) {
    res.status(401).json({
      error:
        "Authorization denied!, Your token may have expired please logout and log back in again.",
    });
  }
};
