const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Recipe, User, User_Recipe } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all posts associated with the logged-in user
router.get('/', withAuth, async (req, res) => {
  try {
    const dbUser_RecipeData = await User.findByPk(req.session.userId, {
      // order: [['created_at', 'DESC']],

      include: [
        {
          model: Recipe,
          as: "userMadeRecipes",

        },
      ]

    });
    
    // // serialize data before passing to template
    const User_Recipe = dbUser_RecipeData.get({ plain: true });
    res.status(200).json(User_Recipe);

    // res.render('User_Recipe', {
    // User_Recipe,
    // user_id: req.session.user_id,
    // recipe_id: req.session.recipe_id,

    // loggedIn: true
    // });
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});


// GET selected post
router.get('/:id', async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.params.id, {
      // order: [['created_at', 'DESC']],

      include: [
        {
          model: Recipe,
          through: User_Recipe,
          as: "userMadeRecipes"
        },
      ]

    });

    if (!dbUserData) {
      res.status(404).json({ message: 'No Recipe found with this id!' });
      return;
    }

    res.status(200).json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

module.exports = router;