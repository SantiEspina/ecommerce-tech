const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING, 
      required: true ,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail:true,
      }
    },
    photoURL: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      set(value){
      if (value){
           const salt = bcrypt.genSaltSync(10);
           const hash = bcrypt.hashSync(value, salt);
           this.setDataValue('password', hash)
         }
      }
    },
    adress: {
      type: DataTypes.TEXT
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })
  User.prototype.compare = function(pass){
    return bcrypt.compareSync(pass, this.password);
  }
  return User;
}
