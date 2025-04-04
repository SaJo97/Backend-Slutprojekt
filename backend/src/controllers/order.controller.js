import Order from "../models/order.model.js";
import asyncHandler from "express-async-handler";
import Product from "../models/product.model.js";

// Controller to create a new order
export const createOrder = asyncHandler(async (req, res) => {
  const { products } = req.body; // Destructure products from request body

  // Check if user ID is provided
  if (!req.userId) {
    return res.status(400).json({ message: "User  ID is required" }); // Send 400 if user ID is missing
  }

  try {
    // Get product information based on product IDs
    const productDetails = await Product.find({
      _id: { $in: products.map((p) => p.productId) }, // Find products matching the provided IDs
    });

    let totalPrice = 0; // Initialize total price

    // Calculate total price for the order
    products.forEach((product) => {
      const productDetail = productDetails.find(
        (p) => p._id.toString() === product.productId // Find the product detail by ID
      );
      if (productDetail) {
        totalPrice += productDetail.price * product.quantity; // Update total price
      }
    });

    // Create a new order with the calculated total price
    const newOrder = await Order.create({
      userId: req.userId, // Associate order with the user
      products,
      totalPrice, // Include total price in the order
    });

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder }); // Send back the created order with 201 status
  } catch (error) {
    // Handle any errors that may occur
    console.error(error); // Log the error
    res
      .status(500)
      .json({ message: "An error occurred while making the order" }); // Send 500 Internal Server Error
  }
});

// Controller to get the order history for a user
export const getOrderHistory = asyncHandler(async (req, res) => {
  try {
    // Find all orders for the authenticated user and populate product details
    const orders = await Order.find({ userId: req.userId })
      .populate({
        path: "products.productId", // Populate product details
        select: "name images price", // Select specific fields to return
      })
      .exec();

    res.status(200).json(orders); // Send back the order history with 200 status
  } catch (error) {
    console.error(error); // Log the error
    res
      .status(500)
      .json({ message: "An error occurred while fetching order history" }); // Send 500 Internal Server Error
  }
});

// Controller to get a specific order by ID
export const getOrderHistoryId = asyncHandler(async (req, res) => {
  const { orderId } = req.params; // Get the order ID from request parameters

  try {
    // Find the order by ID and ensure it belongs to the authenticated user
    const order = await Order.findOne({ _id: orderId, userId: req.userId })
      .populate("products.productId") // Populate product details
      .exec();

    if (!order) {
      return res.status(404).json({ message: "Order not found" }); // Send 404 if order not found
    }

    res.status(200).json(order); // Send back the found order with 200 status
  } catch (error) {
    console.error(error); // Log the error
    res
      .status(500)
      .json({ message: "An error occurred while calculating the order." }); // Send 500 Internal Server Error
  }
});

// Controller for guest orders (without user authentication)
export const guestOrder = asyncHandler(async (req, res) => {
  const { products } = req.body; // Destructure products from request body

  try {
    // Get product information based on product IDs
    const productDetails = await Product.find({
      _id: { $in: products.map((p) => p.productId) }, // Find products matching the provided IDs
    });

    let totalPrice = 0; // Initialize total price

    // Calculate total price for the order
    products.forEach((product) => {
      const productDetail = productDetails.find(
        (p) => p._id.toString() === product.productId // Find the product detail by ID
      );
      if (productDetail) {
        totalPrice += productDetail.price * product.quantity; // Update total price
      }
    });

    // Return order details without saving to the database
    res.status(200).json({
      message: "Order placed successfully", // Success message
      products: productDetails.map((productDetail) => ({
        productId: productDetail._id, // Include product ID
        name: productDetail.name, // Include product name
        price: productDetail.price, // Include product price
        quantity: products.find(
          (p) => p.productId === productDetail._id.toString() // Find quantity for the product
        ).quantity,
      })),
      totalPrice, // Include total price in the response
    });
  } catch (error) {
    // Handle any errors that may occur
    console.error(error); // Log the error
    res
      .status(500)
      .json({ message: "An error occurred while calculating the order." }); // Send 500 Internal Server Error
  }
});
