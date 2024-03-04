const Expense = require("../models/expense");

// to send pagination and expenses list in frontend
exports.pagination = async (req, res) => {
  try {
    const targetPage = req.query.page;
    const expensePerPage = Number(req.query.rows);

    const totalExpenses = await Expense.countDocuments();

    const userExpenses = await Expense.find({ userId: req.user._id })
      .skip((targetPage - 1) * expensePerPage)
      .limit(expensePerPage);

    // console.log(userExpenses);

    res.status(200).json({ userExpenses, totalExpenses });
  } catch (err) {
    console.log(err);
  }
};
