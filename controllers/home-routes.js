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

//get one profile with all of user recipes and when they click on the recipe they will see the full recipe
router.get('/profile/:id', async (req,res)=>{
    try{
        const dbProfileData = await User_Recipe.findOne({
            where:{
                id:req.body.id,
            },
       
    }); 

    // try{
    //     const dbProfileData = await User_Recipe.findByPk({
    //     include: [
    //         {   
    //             model: User_Recipe,
            
    //         },
    //     ],
       
    // }); 
    res.status(200).json(dbProfileData);
    // res.render('profile',dbProfileData)

    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});


//get one recipe
router.get('/recipe/:id',withAuth, async (req,res)=>{
    try{
        const dbRecipeData = await Recipe.findByPk({
            include: [{
                model: Recipe,
                attributes:[
                    'id',
                    'name',
                    'description',
                    'post_date',
                    'ingredients',
                    'instructions',
                ],

            }],

        });
        res.render('profile',dbRecipeData)

    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});


module.exports = router;