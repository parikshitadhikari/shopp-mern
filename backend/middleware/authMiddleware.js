//for using cookie
import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

//we'll have two functions: "protect" to protect routes and "admin" to admin users

//protect routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  //read jwt from the cookie
  token = req.cookies.jwt; //jwt is name of the cookie

  if (token) {
    //if there is a token, we need to verify it
    try {
      //decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //decoded is a object, that now has a userId field
      req.user = await User.findById(decoded.userId).select("-password"); //find the user with the id in the decoded object, as we don't want to return the password we do -password
      //doing req.user so that we can access the user in the protected routes as the user object will be on the req object on all our routes
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

//admin middleware
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    //req.user is set in the protect middleware, and if that user is admin then we'll allow the user to access the route
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};
