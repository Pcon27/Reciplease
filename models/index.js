const User = require('./User');
const Recipe = require('./Recipe');
const User_Recipe = require('./User_Recipe');

// User/Recipe associations
// use as keyword

Recipe.belongsTo(User, {
    // foreignKey: 'recipe_id',
    through: {
        model: User_Recipe,
        //field referenced in the association must have a unique constraint placed on it. 
        unique: false
      },
      as:"usersRecipes",
});

User.belongsToMany(Recipe, {
  //commented back in for seeds
  foreignKey: 'user_id',
  through: {
      model: User_Recipe,
      //field referenced in the association must have a unique constraint placed on it. 
      unique: false
    },
    as:"userMadeRecipes",
});

// how to do "join tables"

module.exports = { User, Recipe, User_Recipe,};