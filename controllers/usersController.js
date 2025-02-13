const asyncHandler = require("express-async-handler"); //handles async errors
const Contact = require("../models/contactModel");

//@desc Register a User
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  res.json({ message: "Register the User" });
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
