const router = require('express').Router();
const { User } = require('../../models');
// const withAuth = require('../../utils/auth');
// const {randomNumber} = require('../../utils/helpers');

// // GET /api/users (get all users)
// router.get('/', async (req, res) => {
//     // Access our User model and run .findAll() method)
//     try {
//         const dbUserData = await User.findAll({
//       attributes: { exclude: ['password'] }
//     });
//     res.status(200).json(dbUserData);

//     }catch(err) {
//         console.log(err);
//         res.status(500).json(err);
//       };
// });

// // GET /api/users/1 (get user by ID)
// router.get('/:id', async (req, res) => {
//     try {
//     const dbUserData = await User.findOne(req.params.id, {

//       attributes: { exclude: ['password'] },
//       include: [
//         {
//           model: Post,
//           attributes: ['id', 'title', 'post', 'created_at']
//         },
//     ]
//     });
//         // include the Comment model here:
    
//     if (!dbUserData) {
//           res.status(404).json({ message: 'No user found with this id' });
//           return;
//         };
//     res.json(dbUserData);

//     }catch(err) {
//         console.log(err);
//         res.status(500).json(err);
//       };
// });

// CREATE new user
router.post('/', async (req, res) => {
    try {
      const dbUserData = await User.create(req.body);

  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.loggedIn = true;
  
        res.status(200).json(dbUserData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
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
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
  
      req.session.save(() => {
        req.session.loggedIn = true;
  
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
  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports = router;