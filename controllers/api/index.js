const router = require('express').Router();
const userRoutes = require('./user-routes');
const recipeRoutes = require('./recipe-routes');
const profileRoutes = require('./profile-routes');

router.use('/users', userRoutes);
router.use('/recipe', recipeRoutes);
router.use('/profile',profileRoutes);

module.exports = router;
