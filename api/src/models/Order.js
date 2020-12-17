const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  //
  sequelize.define('order',{
    state:{
      type: DataTypes.ENUM,
      values: ['pending','complete'],
      defaultValue: 'pending'
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
  })
};
