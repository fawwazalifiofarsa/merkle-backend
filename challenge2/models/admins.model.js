'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admins extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  admins.init({
    admin_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name:{
       type: DataTypes.STRING,
       allowNull: false
    },
    email:{
       type: DataTypes.STRING,
       allowNull: false
    },
    password:{
       type: DataTypes.TEXT,
       allowNull: false
    }
  }, {
    sequelize,
    modelName: 'admins',
  });
  return admins;
};