const router = require("express").Router();
const { User, Recipe } = require("../../models");

// CREATE new user
//ask about session
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create(req.body);
    req.session.save(() => {
      req.session.userId = dbUserData.id;
      req.session.loggedIn = true;
      res.status(200).json(dbUserData);
    });
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
    console.log("req.session.loggedIn", req.session.loggedIn);
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;
      console.log("req.session.loggedIn", req.session.loggedIn);
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
      res.redirect("/");
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
