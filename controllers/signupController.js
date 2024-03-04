const User = require("../models/users");
const bcrypt = require("bcrypt");

exports.signup = async (req, res, next) => {
  try {
    const data = req.body;
    // console.log(data.email);

    let user = await User.find({ email: data.email });

    // if user found
    if (user.length > 0) {
      return res.status(302).json({ message: "User already exists" });
    }
    // if user not found
    else {
      const saltRounds = 10;
      bcrypt.hash(data.password, saltRounds, async (err, hash) => {
        console.log(err);
        user = new User({
          name: data.name,
          email: data.email,
          password: hash,
          totalExpense: 0,
        });

        let result = await user.save();
        console.log(result);

        res.status(200).json({ message: "User is now registered" });
      });
    }
  } catch (err) {
    console.error(err);
  }
};
