const User = require("../models/users");
const Order = require("../models/order");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAccessToken = (id, name, isPremium) => {
  return jwt.sign(
    { userID: id, name: name, isPremium: isPremium },
    process.env.JWT_TOKEN_SECRET
  );
};

exports.login = async (req, res, next) => {
  try {
    const data = req.body;
    let user = await User.find({ email: data.email });

    // if user found
    if (user.length > 0) {
      bcrypt.compare(data.password, user[0].password, (err, result) => {
        // Password doesn't match
        if (err) {
          console.log("err", result);
          res.status(401).json({ message: "Something went wrong..." });
        }

        // password matches
        if (result === true) {
          const loginSuccess = async () => {
            try {
              const premiumCheck = await Order.find({
                userId: user[0],
                status: "SUCCESS",
              });
              console.log(premiumCheck);

              if (premiumCheck.length > 0) {
                console.log(1, premiumCheck[0].status);

                res.json({
                  message: "User Logged in Successfully",
                  token: generateAccessToken(
                    user[0]._id.toString(),
                    user[0].name,
                    true
                  ),
                });
              } else {
                res.json({
                  message: "User Logged in Successfully",
                  token: generateAccessToken(user[0]._id, user[0].name, false),
                });
              }
            } catch (err) {
              console.log(err);
            }
          };

          loginSuccess();
        } else {
          // console.log('f', result);
          res.status(401).json({ message: "Wrong Password, Try Again" });
        }
      });
    }
    // if user not found
    else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (err) {
    console.error(err);
  }
};
