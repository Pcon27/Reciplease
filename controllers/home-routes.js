const router = require('express').Router();
const { Recipe, User_Recipe,User } = require('../models');
const withAuth = require('../utils/auth');

//get all profiles for homepage
//need User_recipe model , rename to profile??
router.get('/', async (req, res) => {  
    // console.log(User_Recipe);
    console.log("hello");
    try {
        var dbRecipeData = await Recipe.findAll({
            include: [
                {
                  model:User,
                  attributes:['username'],
                  as:"usersRecipes",
  
                },
            ]
        });
        res.status(200).json(dbRecipeData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});


module.exports = router;