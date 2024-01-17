const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Downloads = sequelize.define('download', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Downloads;