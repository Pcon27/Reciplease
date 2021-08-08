const User = require("./User");
const Recipe = require("./Recipe");
const User_Recipe = require("./User_Recipe");

// // User/Recipe associations
// // use as keyword

// User_Recipe.associate = (models) => {

// User_Recipe.belongsTo(models.User, {
//   foreignKey: "user_id",
//   // targetKey: "user_id",
//   as: "User",
// });

// User_Recipe.belongsTo(models.Recipe, {
//   foreignKey: "recipe_id",
//   // targetKey: "recipe_id",
//   as: "Recipe",
// });
// };

Recipe.belongsToMany(User, {
  as: "usersRecipes",
  through: User_Recipe,
  //field referenced in the association must have a unique constraint placed on it.
  unique: false,
  foreignKey: "recipe_id",
});



User.belongsToMany(Recipe, {
  //commented back in for seeds
  as: "userMadeRecipes",
  through: User_Recipe,
  //field referenced in the association must have a unique constraint placed on it.
  unique: false,
  foreignKey: "user_id",
});

module.exports = { User, Recipe, 
  User_Recipe
 };
