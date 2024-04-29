import asyncHandler from "../middleware/asyncHandler.js"; // custom async handler
import Product from "../models/productModel.js";

//fetch all the products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}); //gets all the products
  res.send(products);
});

//get single product by id
const getProductById = asyncHandler(async (req, res) => {
  // const product = products.find((p) => p._id === req.params.id);
  //to get a single product
  const product = await Product.findById(req.params.id);

  //if no product then throw a message
  if (product) {
    res.json(product);
  } else {
    //   res.status(404).json({ message: "Product not found" }); //this will simply be overwritten by cast error so instead of this we use error handler as:
    res.status(404);
    throw new Error("Product not found");
  }
});
export { getProducts, getProductById };
