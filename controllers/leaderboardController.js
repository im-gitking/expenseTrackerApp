const User = require("../models/users");

exports.leaderboard = async (req, res, next) => {
  try {
    const leaders = await User.find()
      .select("name totalExpense")
      .sort({ totalExpense: -1 });

    res.status(201).json(leaders);
  } catch (err) {
    console.log(err);
  }
};
