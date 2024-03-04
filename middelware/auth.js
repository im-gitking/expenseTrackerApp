const User = require("../models/users");
const jwt = require("jsonwebtoken");

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    // console.log(token);
    const userDetails = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    // console.log(1, userDetails);
    const user = await User.findById(userDetails.userID);
    req.user = user;
    // console.log(2, req.user);
    next();
  } catch (err) {
    console.log(err);
  }
};
