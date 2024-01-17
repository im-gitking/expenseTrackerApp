const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Forgotpassword = sequelize.define('forgotpassword', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    uuid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isActive: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Forgotpassword;