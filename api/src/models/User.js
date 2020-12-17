const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('user', {
    name: {
      type: DataTypes.STRING, 
      required: true ,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail:true,
      }
    },
    password: {
      type: DataTypes.STRING,
    },
    direction: {
      type: DataTypes.TEXT,
      allowNull: false,
      required: true
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })
}
