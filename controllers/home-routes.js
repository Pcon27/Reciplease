const router = require('express').Router();
const {Post, Recipe } = require('../models');
const withAuth = require('../utils/auth');

//get all profiles for homepage
//need User_recipe model , rename to profile??
router.get('/', async (req, res) => {  
    try {
        const dbPostData = await Post.findByAll({
            include: [
                {
                    model: Post,
                    attributes: [
                        'user_id',
                        'recipe_name',
                        'recipe_description',
                    ],
                },
            ],
        });
        res.render('homepage',dbPostData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

//get one profile with all of user recipes and when they click on the recipe they will see the full recipe
router.get('/profile/:id',withAuth,async (req,res)=>{
    try{
        const dbProfileData = await Post.findByPk({
        include: [
            {   
                model: Post,
                attributes: [
                    'user_id',
                    'recipe_name',
                    'recipe_description',
                ],
            },
        ],
       
    }); 
    res.render('profile',dbProfileData)

    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});


//get one recipe
router.get('/recipe/:id',withAuth,async,(req,res)=>{
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