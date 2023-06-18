import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

//login user and get token, route: POST /api/users/login
const authUser = asyncHandler(async (req, res) => {
  res.send("auth user");
});

//register user, route: POST /api/users
const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

//logout user/ clear cookie, route: POST /api/users/logout, the access will be private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});

//get user profile, route: GET /api/users/profile, access: private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

//update user profile, route: PUT /api/users/profile, access: private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

//get all users, route: GET /api/users, access: private/admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get all users");
});

//get user by id, route: GET /api/users/:id, access: private/admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

//delete user, route: DELETE /api/users/:id, access: private/admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

//update user, route: PUT /api/users/:id, access: private/admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
