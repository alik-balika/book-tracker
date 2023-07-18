import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc    Authenticate user/set token
// route    POST /api/users/auth
// @access  Public
const authenticateUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Authenticate User" });
});

// @desc    Register a new User
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Register User" });
});

// @desc    Logout User
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Logout User" });
});

// @desc    Get User Profile
// route    GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get User" });
});

// @desc    Update User
// route    PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update User" });
});

export {
  authenticateUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
