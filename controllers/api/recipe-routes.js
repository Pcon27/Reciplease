const router = require('express').Router();
const { Recipe,User_Recipe,User} = require('../../models');//double check models
const withAuth = require('../../utils/auth');
//view recipe
//works
router.get('/:id', async (req, res) => {    //will need withAuth
    try {
        const dbRecipeData = await Recipe.findOne({
            where:{id:req.params.id},
            include: [
                {
                  model: User,
                  attributes: ["username"],
                  as: "usersRecipes",
                },
              ]
        });
       
        res.status(200).json(dbRecipeData);
     }catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

//post a new recipe

router.post('/', withAuth,async (req, res) => {
    try {

        const dbRecipeData = await Recipe.create({
    
            user_id:req.session.userId,
            name: req.body.name,
            description: req.body.description,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
        });
        // const headerId = header.id      
        // await bookingDescription.create({state:'active',createdBy:'somebody',modifiedBy:'somebody',bookingHeaderId:headerId})      
        // res.json(header);
        const dbId = dbRecipeData.id;
        await User_Recipe.create({
            user_id:req.session.userId,
            // recipe_id:req.session.userId,
            recipe_id:dbId

        });
     
        res.status(200).json(dbRecipeData);
        // });
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;
