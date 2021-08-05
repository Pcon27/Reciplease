const User = require('./User');
const Recipe = require('./Recipe');
const User_Recipe = require('./User_Recipe');

// User/Recipe associations
User.hasMany(Recipe, {
    foreignKey: 'user_id'
});

Recipe.belongsTo(User, {
    foreignKey: 'user_id',
});

// how to do "join tables"

module.exports = { User, Recipe, User_Recipe, Comment };