const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User_Recipe extends Model {}

User_Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    recipe_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Recipe',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'User_Recipe',
  }
);

module.exports = User_Recipe;
