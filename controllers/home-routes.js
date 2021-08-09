const router = require("express").Router();
const { Recipe, User_Recipe, User } = require("../models");
const withAuth = require("../utils/auth");
//***********************************************************************************/
//**********************************************************************************/
//************************************BEGIN HOME ROUTES****************************/
//get all profiles for homepage
router.get("/", async (req, res) => {
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
    const recipes = dbRecipeData.map((recipe) => recipe.get({ plain: true }));
    console.log("recipes", recipes);
    res.render("homepage", {
      recipes,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//*************************************END HOME ROUTES*******************************/
//**********************************************************************************/
//*********************************************************************************/
//************************************BEGIN USER ROUTES**************************/
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
// GET /users/1 (get user by ID)
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
    const User_Recipe = dbUserData.get({ plain: true });
    res.render("profile", {
      User_Recipe,
      loggedIn: true,
    });
    if (!dbUserData) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    // res.json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//*************************************END USER ROUTES*******************************/
//**********************************************************************************/
//*********************************************************************************/
//************************************BEGIN PROFILE ROUTES************************/
// GET all posts associated with the logged-in user
//works
router.get("/profile", withAuth, async (req, res) => {
  try {
    const dbUser_RecipeData = await User.findByPk(req.session.userId, {
      // order: [['created_at', 'DESC']],
      include: [
        {
          model: Recipe,
          as: "userMadeRecipes",
        },
      ],
    });
    // serialize data before passing to template
    const User_Recipe = dbUser_RecipeData.get({ plain: true });
    res.render("profile", {
      User_Recipe,
      loggedIn: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET selected post
//works
router.get("/profile/:id", async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.params.id, {
      // order: [['created_at', 'DESC']],
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Recipe,
          as: "userMadeRecipes",
        },
      ],
    });
    const User_Recipe = dbUser_RecipeData.get({ plain: true });
    res.render("profile", {
      User_Recipe,
      loggedIn: true,
    });

    if (!dbUserData) {
      res.status(404).json({ message: "No Recipe found with this id!" });
      return;
    }

    res.status(200).json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});
//*************************************END PROFILE ROUTES*******************************/
//*************************************************************************************/
//************************************************************************************/
//************************************BEGIN RECIPE ROUTES****************************/
//view recipe
//works
router.get("/recipe/:id", async (req, res) => {
  //will need withAuth
  try {
    const dbRecipeData = await Recipe.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: User,
          attributes: ["username"],
          as: "usersRecipes",
        },
      ],
    });
    const User_Recipe = dbUser_RecipeData.get({ plain: true });
    res.render("recipe", {
      User_Recipe,
      loggedIn: true,
    });

    res.status(200).json(dbRecipeData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/api/recipe", withAuth, (req, res) => {
  try {
    res.render("add-recipe");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//*************************************END RECIPE ROUTES********************************/
//*************************************************************************************/
//************************************************************************************/
//************************************BEGIN LOGIN ROUTES*****************************/
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
//*************************************END LOGIN ROUTES********************************/
//************************************************************************************/
//***********************************************************************************/
module.exports = router;
