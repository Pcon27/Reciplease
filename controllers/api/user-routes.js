const router = require("express").Router();
const { User, Recipe } = require("../../models");

// GET /api/users (get all users)

router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
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

// CREATE new user
//ask about session
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create(req.body);

    // req.session.save(() => {
    //   req.session.id = userData.id;
    // req.session.loggedIn = true;

    res.status(200).json(dbUserData);
    // });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    console.log(dbUserData, "this is the data");
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please tell me why you arent working' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);

  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
