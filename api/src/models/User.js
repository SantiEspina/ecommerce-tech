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
     allowNull: false,
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
    state: {
        type: DataTypes.ENUM,
        values:['admin','invited','client']
    }
})
}
