import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

// import data into the database
const importData = async () => {
  try {
    // clear the database first i.e delete everything
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    // now insert the users
    const createUsers = await User.insertMany(users);
    // get the admin user
    const adminUser = createUsers[0]._id;
    // add the admin user to the products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }; //return an object with all the properties of the product and add the user property to it
    });
    // now insert the sample products
    await Product.insertMany(sampleProducts);
    console.log("Data inserted!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
  }
};

// destroy data in the database
const destroyData = async () => {
  try {
    // clear the database first i.e delete everything
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
  }
};

// if we run node backend/seeder.js -d, then we will destroy the data
// if we run node backend/seeder.js, then we will import the data
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
