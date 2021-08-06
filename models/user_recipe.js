const { Model, DataTypes } = require('sequelize');
// const { User_Recipe } = require('.');
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
    recipe_name: {
        type: DataTypes.STRING,
        references: {
            model: 'Recipe',
            key: 'name',
          },
    },
    recipe_description: {
        type: DataTypes.STRING,
        references: {
            model: 'Recipe',
            key: 'description',
          },
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = User_Recipe;
