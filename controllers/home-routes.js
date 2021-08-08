const router = require("express").Router();
const { Recipe, User_Recipe, User } = require("../models");
const withAuth = require("../utils/auth");

//get all profiles for homepage
//need User_recipe model , rename to profile??
router.get("/", async (req, res) => {
  // console.log(User_Recipe);
  console.log("hello");
  try {
    var dbRecipeData = await Recipe.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
          as: "usersRecipes",
        },
      ],
    });
    const recipes = dbRecipeData.map((recipe) =>
      recipe.get({ plain: true })
    );

    res.status(200).json(dbRecipeData).render('homepage', {
      recipes
    })
    // res.status(200).json(dbRecipeData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get("/users", async (req, res) => {
  // Access our User model and run .findAll() method)
  try {
    const dbUserData = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET /api/users/1 (get user by ID)
router.get("/users/:id", async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Recipe,
          through: User,
          as: "userMadeRecipes",
        },
      ],
    });
    // include the Comment model here:

    if (!dbUserData) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    res.json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Login route
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  console.log("req.session.loggedIn", req.session.loggedIn);
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'login' template
  res.render("login");
});

module.exports = router;
