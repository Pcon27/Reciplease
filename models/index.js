const User = require('./User');
const Recipe = require('./Recipe');
const User_Recipe = require('./User_Recipe');

// User/Recipe associations
User.hasMany(Recipe, {
    foreignKey: 'user_id',
    through: {
        model: User_Recipe,
        //field referenced in the association must have a unique constraint placed on it. 
        unique: false
      },
});

Recipe.belongsTo(User, {
    foreignKey: 'user_id',
    through: {
        model: User_Recipe,
        //field referenced in the association must have a unique constraint placed on it. 
        unique: false
      },
});

// how to do "join tables"

module.exports = { User, Recipe, User_Recipe, Comment };