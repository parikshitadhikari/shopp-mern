import jwt from "jsonwebtoken";

const generateToken = (res,userId) => {
    //create a token
    const token = jwt.sign(
        {
          //1st arg is object with payload, payload is an object literal containing the data to be encoded i.e user id
          userId //userId: userId
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
}
export default generateToken;