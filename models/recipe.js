const { Model, DataTypes } = require('sequelize');
// const { User } = require('.');
const sequelize = require('../config/connection');

class Recipe extends Model {}

Recipe.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        }, 
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.STRING,
            references: {
              model: 'User',
              key: 'id',
            },
          },
        post_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ingredients: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        instructions: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    }, 
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
      }
);
module.exports = Recipe;