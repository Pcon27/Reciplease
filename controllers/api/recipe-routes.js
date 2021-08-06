const router = require('express').Router();
const { Recipe } = require('../../models');//double check models
const withAuth = require('../../utils/auth');
//view recipe
router.get('/:id', withAuth, async (req, res) => {    //will need withAuth
    try {
        const dbRecipeData = await Recipe.findByPk({
            include: [
                {
                    model: Recipe,
                    attributes: [
                        'id',
                        'name',
                        'description',
                        'post_date',
                        'ingredients',
                        'instructions',
                    ],
                },
            ],
        });
        const Recipe = dbRecipeData.get({ plain: true });
        res.render('recipe', { Recipe, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

//post a new recipe
router.post('/', async (req, res) => {
    try {
        const dbRecipeData = await Recipe.create({
            name: req.body.name,
            description: req.body.description,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
        });
        res.status(200).json(dbRecipeData);

    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;
