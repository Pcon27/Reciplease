const sequelize = require('../config/connection');
const {User,Recipe, User_Recipe} = require('../models');

const userSeedData = require('./userSeedData.json');
const recipeSeedData = require('./recipeSeedData.json');
const user_recipeSeedData = require(`./user_recipeSeedData.json`)

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    const recipes = await Recipe.bulkCreate(recipeSeedData);

    const users = await User.bulkCreate(userSeedData);

    const user_recipes = await User_Recipe.bulkCreate(user_recipeSeedData);

    process.exit(0);
};

seedDatabase();

