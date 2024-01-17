const sequelize = require('../util/database');

// Add Expense
exports.postExpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const data = req.body;
        const expense = await req.user.createExpense(data, { transaction: t });

        req.user.totalExpense += data.expenseamount;
        await req.user.save({ transaction: t });

        await t.commit();
        res.json(expense);
    }
    catch (err) {
        await t.rollback();
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
    const t = await sequelize.transaction();
    try {
        const expenseId = req.params.id;
        // const expense = await Expenses.findByPk(expenseId, { transaction: t });
        const expense = await req.user.removeExpense(expenseId, { transaction: t });

        req.user.totalExpense -= expense.expenseamount;
        await req.user.save({ transaction: t });

        await t.commit();
        res.json('SUCCESS');
    }
    catch (err) {
        await t.rollback();
        console.log(err);
    }
};

