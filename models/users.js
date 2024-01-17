const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Users = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    totalExpense: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Users;