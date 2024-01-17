// to send pagination and expenses list in frontend
exports.pagination = async (req, res) => {
    try {
        const targetPage = req.query.page;
        const expensePerPage = Number(req.query.rows);

        const totalExpenses = await req.user.countExpenses();

        const userExpenses = await req.user.getExpenses({
            offset: (targetPage - 1) * expensePerPage,
            limit: expensePerPage
        });

        res.status(200).json({ userExpenses, totalExpenses });
    }
    catch (err) {
        console.log(err);
    }
}