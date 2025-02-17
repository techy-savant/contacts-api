const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/usersController");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/current").get(currentUser);

router.post('/test', (req, res) => {
  const {user} = req.body;
  res.json({ message: 'Test route working', user });
});

module.exports = router;
