const Users = require('../models/users');

exports.leaderboard = async (req, res, next) => {
    try {
        const leaders = await Users.findAll({
            attributes: ['name', 'totalExpense'],
            order: [['totalExpense', 'DESC']]
        });

        res.status(201).json(leaders);
    }
    catch (err) {
        console.log(err);
    }
};