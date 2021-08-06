const sequelize = require('../config/connection');
const {User,Recipe} = require('../models');

const userSeedData = require('./userSeedData.json');
const recipeSeedData = require('./recipeSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: false });
    
    const recipes = await Recipe.bulkCreate(recipeSeedData);

    const users = await User.bulkCreate(userSeedData);

    process.exit(0);
};

seedDatabase();

