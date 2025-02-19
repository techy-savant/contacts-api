const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/usersController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/current").get(validateToken, currentUser);

module.exports = router;
