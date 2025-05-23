import mongoose from "mongoose";
import Product from "../models/product.model.js";
import asyncHandler from "express-async-handler";

// Controller to create a new product
export const createNewProduct = asyncHandler(async (req, res) => {
  const { name, price, description, category, images } = req.body;

  // Check if all required fields are provided
  if (!name || !price || !description || !category || !images) {
    return res
      .status(400) // Send 400 Bad Request if fields are missing
      .json({
        message:
          "All field (name, price, description, category, images) is required.",
      });
  }

  try {
    // Create a new product in the database
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct); // Send back the created product with 201 status
  } catch (error) {
    // Handle validation errors
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(400) // Send 400 Bad Request for validation errors
        .json({ message: "Validation error", errors: error.errors });
    }
    console.error(error); // Log any other errors
    res.status(500).json({ message: "Error when creating product" });
  }
});
// Controller to get all products
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().exec(); // Fetch all products from the database

  res.status(200).json(products); // Send back the list of products with 200 status
});
// Controller to get a single product by ID
export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params; // Get the product ID from request parameters

  // Check if the ID is valid
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid product-ID" });
  }

  const product = await Product.findById(id); // Find the product by ID

  // Check if the product exist
  if (!product) {
    return res.status(404).json({ message: `Can't find the product` });
  }

  res.status(200).json(product); // Send back the found product with 200 status
});
// Controller to update a product
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, description, category, images } = req.body; // Destructure request body

  console.log("Incoming request body:", req.body);

  // Check if the ID is valid
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid product-ID" });
  }

  // Check if the product name is unique
  if (name) {
    const existingProduct = await Product.findOne({ name: name, _id: { $ne: id } }); // Find a product with the same name but different ID
    if (existingProduct) {
      return res.status(400).json({ message: "Product name must be unique." });
    }
  }

  const toUpdate = {}; // Object to hold fields to update
  if (name) toUpdate.name = name; // Add name to update if provided
  if (price) toUpdate.price = price; // Add price to update if provided
  if (description) toUpdate.description = description; // Add description to update if provided
  if (category) toUpdate.category = category; // Add category to update if provided
  if (images) toUpdate.images = images; // Add images to update if provided

  // Check if there are no changes to update
  if (Object.keys(toUpdate).length === 0) {
    res.status(400).json({ message: "No changes provided" });
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, toUpdate, {
    new: true, // Return the updated document
  }).exec();

  // Check if the product was found and updated
  if (!updatedProduct) {
    return res.status(404).json({ message: `Can't find the product` });
  }

  res.status(200).json(updatedProduct);
});

// Controller to delete a product
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  console.log("Attempting to delete product with ID:", id);

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product-ID" });
  }
  try {
    const product = await Product.findByIdAndDelete(id).exec(); // Attempt to delete the product by ID
    // Check if the product was found and deleted
    if (!product) {
      return res.status(404).json({ message: `Can't find that product` });
    }
    console.log("Product deleted successfully:", product);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting product2:", error); // Log the error
    res.status(500).json({ message: "An error occurred while deleting the product." });
  }
});
