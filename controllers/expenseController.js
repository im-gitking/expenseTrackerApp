const Expense = require("../models/expense");

// Add Expense
exports.postExpense = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);

    const newExpense = new Expense({ ...data, userId: req.user });

    const expense = await newExpense.save();

    req.user.totalExpense += data.expenseamount;
    await req.user.save();

    res.json(expense);
  } catch (err) {
    console.log(err);
  }
};

/*// Expense Show -> Moved to pagination part
exports.getExpense = (req, res, next) => {
    req.user.getExpenses()
        .then(expenses => {
            // console.log(req.user.totalExpense);
            return res.json(expenses);
        })
        .catch(err => console.log(err));
};*/

// Delete Expense
exports.deleteExpense = async (req, res, next) => {
  try {
    const expenseId = req.params.id;

    const expense = await Expense.findByIdAndDelete(expenseId);

    console.log(expense);

    req.user.totalExpense -= expense.expenseamount;
    await req.user.save();

    res.json("SUCCESS");
  } catch (err) {
    console.log(err);
  }
};
