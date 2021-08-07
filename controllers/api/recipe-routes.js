const router = require('express').Router();
const { Recipe,User_Recipe,User} = require('../../models');//double check models
const withAuth = require('../../utils/auth');
//view recipe
router.get('/:id', async (req, res) => {    //will need withAuth
    try {
        const dbRecipeData = await Recipe.findOne({
            where:{id:req.params.id}
        });
       
        res.status(200).json(dbRecipeData);
     }catch (err) {
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
