const router = require('express').Router();
const { Project, User,Post } = require('../models');
const withAuth = require('../utils/auth');

//get all profiles for homepage
//need User_recipe model , rename to profile??
router.get('/', async, (req, res) => {  
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
    }
});

//get one profile
router.get('/profile/:id',withAuth,async,(req,res)=>{
    try{
        const dbProfileData = await Post.findByPk({
        include: [
            {   
                model: Post,
                attributes: [
                    'user_id',
                    'recipe_name',
                    'recipe_description',
                    '',
                ],

            },

        ],
    });

    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//get one recipe