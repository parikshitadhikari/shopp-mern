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

// create a product, post /api/products , private/admin
const createProduct = asyncHandler(async (req, res) => {
  // we create a sample product, then 'our' product can be added by editing the created sample product
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  // getting that particular product using its id
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// delete: api/products/:id, admin-private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
