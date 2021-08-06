const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Recipe, User, User_Recipe } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all posts associated with the logged-in user
router.get('/', withAuth, async (req, res) => {
  try {
    const dbUser_RecipeData = await User_Recipe.findAll(req.session.user_id, {
      order: [['created_at', 'DESC']],

      attributes: [
        'id',
        'user_id',
        'recipe_id',
      ],
      include: [
        {
          model: Recipe,
          attributes: ['id', 'name', 'description', 'user_id', 'post_date', 'ingredients', ],
          // include: {
          //   model: User,
          //   attributes: ['username']
          // }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]

    });
        // // serialize data before passing to template
        const User_Recipe = dbUser_RecipeData.post.get({ plain: true });

        res.render('User_Recipe', {
        User_Recipe,
        user_id: req.session.user_id,
        recipe_id: req.session.recipe_id,

        loggedIn: true
        });
      }
      catch(err) {
        console.log(err);
        res.status(500).json(err);
      };
});


// GET selected post
router.get('user/:id', async (req, res) => {
  try {
    const dbUserData = await User_Recipe.findAll(req.params.user_id, {
      order: [['created_at', 'DESC']],

      attributes: [
        'id',
        'user_id',
        'recipe_id',
      ],
      include: [
        {
          model: Recipe,
          attributes: ['id', 'name', 'description', 'user_id', 'post_date', 'ingredients', ],
          // include: {
          //   model: User,
          //   attributes: ['username']
          // }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]

    });
        // // serialize data before passing to template
        const Recipe = dbUserData.map(post => post.get({ plain: true }));

        res.render('User_Recipe', {
          User_Recipe,
          user_id: req.body.user_id,
        recipe_id: req.body.recipe_id,
        });
      }
      catch(err) {
        console.log(err);
        res.status(500).json(err);
      };
});
    
module.exports = router;

