const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('commandLine', {
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