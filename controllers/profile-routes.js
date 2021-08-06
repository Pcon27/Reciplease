const router = require('express').Router();
const sequelize = require('../config/connection');
const {Recipe, User, User_Recipe } = require('../models');
const withAuth = require('../utils/auth');

// GET all posts associated with the logged-in user
router.get('/', withAuth, async (req, res) => {
  try {
    const dbUserData = await Recipe.findAll(req.session.user_id, {
      order: [['created_at', 'DESC']],

      include: [
        { model: User, through: User_Recipe}, ]
    });
        // serialize data before passing to template
        const Recipe = dbUserData.map(post => post.get({ plain: true }));

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
    const dbUserData = await Recipe.findAll(req.params.user_id, {
      order: [['created_at', 'DESC']],

      include: [{ model: User, through: User_Recipe}]
    });
        // serialize data before passing to template
        const Recipe = dbUserData.map(post => post.get({ plain: true }));

        res.render('profile', {
          User_Recipe,
          username: req.params.username,
          email: req.params.email,
          user_image: req.params.user_image,
          user_id: req.params.user_id,

          loggedIn: true
        });
      }
      catch(err) {
        console.log(err);
        res.status(500).json(err);
      };
});
    
module.exports = router;