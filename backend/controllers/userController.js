import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

//login user and get token, route: POST /api/users/login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; //req.body is the data that is sent to the server as body

  const user = await User.findOne({ email }); //find one record in the db that matches the email, email: email

  //if user exists then send
  if (user && (await user.matchPassword(password))) {
    //2nd condition is true if the entered password matches the hashed password in the db, (see userModel.js)

    //create a token
    const token = jwt.sign(
      {
        //1st arg is object with payload, payload is an object literal containing the data to be encoded i.e user id
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        //process.env.JWT_SECRET is the secretOrPrivateKey
        expiresIn: "30d", //expires in 30 days
      }
    );
    //setting jwt as http Only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", //if in production then true, else false
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      // password: user.password, //we don't want to return the password
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401); //unauthorized
    throw new Error("Invalid email or password");
  }
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
