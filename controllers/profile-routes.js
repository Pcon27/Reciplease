const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, User_Recipe } = require('../models');
const withAuth = require('../utils/auth');

// GET all posts associated with the logged-in user
router.get('/', withAuth, async (req, res) => {
  try {
    const dbPostData = await User_Recipe.findAll(req.session.user_id, {
      order: [['created_at', 'DESC']],
      attributes: [
        'id',
        'name',
        'description',
        'user_id',
        'post_date',
        'ingredients',
        'instructions',
      ],
    });
        // serialize data before passing to template
        const User_Recipe = dbPostData.map(post => post.get({ plain: true }));

        res.render('profile', {
          username: req.session.username,
          email: req.session.email,
          user_image: req.session.user_image,
          user_id: req.session.user_id,

          loggedIn: true
        });
      }
      catch(err) {
        console.log(err);
        res.status(500).json(err);
      };
});

router.get('/:id', async (req, res) => {
  try {
    const dbUserData = await User_Recipe.findAll(req.params.user_id, {
  
    });
        // serialize data before passing to template
        const User_Recipe = dbUserData.map(post => post.get({ plain: true }));
      }
      catch(err) {
        console.log(err);
        res.status(500).json(err);
      };
});
    
module.exports = router;

