const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Orders = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    paymentId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    orderId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Orders;