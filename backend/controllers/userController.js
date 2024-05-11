import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//login user and get token, route: POST /api/users/login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; //req.body is the data that is sent to the server as body

  const user = await User.findOne({ email }); //find one record in the db that matches the email, email: email

  //if user exists then send
  if (user && (await user.matchPassword(password))) {
    //2nd condition is true if the entered password matches the hashed password in the db, (see userModel.js)

    generateToken(res, user._id); //generate token

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
});

//register user, route: POST /api/users
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //checking if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); //bad request
    throw new Error("User already exists");
  }

  //if user doesn't exist then create a user
  const user = await User.create({
    name, //name: name
    email,
    password, //we store the hashed password in the db, pw is hashed in userModel.js
  });
  //if user is created then send the user data
  if (user) {
    generateToken(res, user._id); //generate token when user is registered
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//logout user/ clear cookie, route: POST /api/users/logout, the access will be private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()), //expires immediately
  });
  res.status(200).json({ message: "user logged out" });
});

//get user profile, route: GET /api/users/profile, access: private
const getUserProfile = asyncHandler(async (req, res) => {
  //getting the user:
  const user = await User.findById(req.user._id); //req.user is set in the protect middleware, and we can access the user in the protected routes as the user object will be on the req object on all our routes
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    }); //if user is found then send the user data
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//update user profile, route: PUT /api/users/profile, access: private
const updateUserProfile = asyncHandler(async (req, res) => {
  //getting the user:
  const user = await User.findById(req.user._id); //req.user is set in the protect middleware, and we can access the user in the protected routes as the user object will be on the req object on all our routes

  if (user) {
    //update the fields that we send in the req.body
    user.name = req.body.name || user.name; //if name is sent in the req.body then update the name OR keep the name as it is
    //above user is the user that is logged in
    user.email = req.body.email || user.email;
    //doing this way for pw, coz pw is hashed and we only want to deal with it if it is sent in the req.body
    if (req.body.password) {
      //if password is sent in the req.body then update the password
      user.password = req.body.password;
    }
    const updatedUser = await user.save(); //save the updated user in the db
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//get all users, route: GET /api/users, access: private/admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//get user by id, route: GET /api/users/:id, access: private/admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password"); // we dont want the pw
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//delete user, route: DELETE /api/users/:id, access: private/admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Can not delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//update user, route: PUT /api/users/:id, access: private/admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin); // making sure it is boolean

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
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
