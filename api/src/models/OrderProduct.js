const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('orderProduct', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
};