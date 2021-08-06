const sequelize = require('../config/connection');
const {User,Recipe} = require('../models');

const userSeedDate = require('./userSeedData.json');
const recipeSeedData = require('./recipeSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    process.exit(0);
};

