const router = require('express').Router();
const { Recipe, User_Recipe, User } = require('../../models');//double check models
const withAuth = require('../../utils/auth');

//post a new recipe
router.post('/', withAuth, async (req, res) => {
    try {

        const dbRecipeData = await Recipe.create({
            user_id: req.session.userId,
            name: req.body.name,
            description: req.body.description,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
        });
        const dbId = dbRecipeData.id;
        await User_Recipe.create({
            user_id: req.session.userId,
            recipe_id: dbId
        });
        res.status(200).json(dbRecipeData);
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;
