const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const User = require("../models/users");
const Forgotpassword = require("../models/forgotpass");

exports.forgotpassoword = async (req, res, next) => {
  try {
    const email = req.body.email;

    const users = await User.find({ email: email });
    // if user not found
    if (!users.length) {
      throw new Error("User not found");
    }
    const user = users[0];

    const newUUID = uuidv4();
    const newForgotReq = new Forgotpassword({
      uuid: newUUID,
      isActive: true,
      userId: user,
    });
    const response = await newForgotReq.save();

    const transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: "crypto.king.1@outlook.com",
        pass: process.env.OUTLOOK_PASS,
      },
    });

    const mailOptions = {
      from: "crypto.king.1@outlook.com",
      to: email,
      subject: "Password Reset Link",
      text: `Here is your password rest link - file:///C:/Users/Abhishek/Desktop/js-basics/expressStudy/projects/expenseTrackerApp/frontend/resetPassword.html?id=${newUUID}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        res
          .status(200)
          .json({ message: "Reset Email Sent: Check Your Email Inbox" });
      }
    });
  } catch (err) {
    console.log("err: ", err);
  }
};

exports.changePass = async (req, res, next) => {
  try {
    const uuid = req.params.uuid;
    console.log(uuid);
    const response = await Forgotpassword.find({ uuid: uuid }).populate(
      "userId",
      "email"
    );
    // console.log(response);
    if (response.length > 0) {
      const newPassoword = req.body.password;

      response[0].isActive = false;
      const result = await response[0].save();

      const user = await User.findOne({ email: response[0].userId.email });
      console.log(user.password);

      const saltRounds = 10;
      bcrypt.hash(newPassoword, saltRounds, async (err, hash) => {
        user.password = hash;
        const newRes = await user.save();

        res.status(200).json({ uuid: uuid });
      });
    } else {
      res.status(200).json({ message: "Reset link is expired" });
    }
  } catch (err) {
    console.log(err);
  }
};
