import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  //this method is used to compare the entered password with the hashed password in the database
  return await bcrypt.compare(enteredPassword, this.password); //this.password is the current user's password in the database
};

//this is a middleware that runs before the user is saved in the db (pre) i.e pw is hashed before saving in the db
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    //if we are dealing with some user data but not with password then we are gonna simply move to next middleware
    next();
  }

  //if the password is modified then hash the password
  const salt = await bcrypt.genSalt(10); //10 is the number of rounds
  this.password = await bcrypt.hash(this.password, salt); //this.password is the current user's password in the database that we are saving
});

const User = mongoose.model("User", userSchema);
export default User;
