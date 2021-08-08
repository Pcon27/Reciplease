const sequelize = require('../config/connection');
const { User, Recipe, User_Recipe } = require('../models');

const userSeedData = require('./userSeedData.json');
const recipeSeedData = require('./recipeSeedData.json');
const user_recipeSeedData = require(`./user_recipeSeedData.json`)

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userSeedData);
    const recipes = await Recipe.bulkCreate(recipeSeedData);
    const user_recipes = await User_Recipe.bulkCreate(user_recipeSeedData);


    // for (const recipe of recipeSeedData) {
    //     await Recipe.create({
    //       ...recipe,
    //       user_id: users[Math.floor(Math.random() * users.length)].id,
    //     });
    //   }

    process.exit(0);
};

seedDatabase();

