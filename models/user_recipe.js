const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
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

module.exports = Post;
