const asyncHandler = require("express-async-handler"); //handles async errors
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

//@desc Register a User
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  console.log('Request body:', req.body); // Add this

  const { username, email, password } = req.body;
  console.log('Validating input...'); // Add this

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  //check if user already exists
  console.log('Checking for existing user...'); // Add this
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  //Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hashedPassword);

  //Create New User
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log("New User Created:", user);

  //Send Response if User Created
  if (user) {
    // Send success response
    return res.status(201).json({
      _id: user.id,
      email: user.email,
    });
  }

  // If user creation failed
  res.status(400);
  throw new Error("User data is not valid");
});

//@desc Login a User
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Log the User In" });
});

//@desc Current User Info
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current User Information" });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
