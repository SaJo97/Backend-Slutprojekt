import mongoose from "mongoose";

// Define the schema for an Order
const orderSchema = new mongoose.Schema(
  {
    userId: {
      // Reference to the user who placed the order
      type: mongoose.Schema.Types.ObjectId, // Use ObjectId type for MongoDB reference
      ref: "User ", // Reference the User model
      required: true, // This field is required
    },
    products: [
      // Array of products included in the order
      {
        productId: {
          // Reference to the product
          type: mongoose.Schema.Types.ObjectId, // Use ObjectId type for MongoDB reference
          ref: "Product", // Reference the Product model
          required: true, // This field is required
        },
        quantity: { type: Number, required: true }, // Quantity of the product ordered
      },
    ],
    totalPrice: { type: Number, required: true }, // Total price of the order
    createdAt: { type: Date, default: Date.now() }, // Timestamp for when the order was created
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create the Order model based on the orderSchema
const Order = mongoose.model("Order", orderSchema);

// Export the Order model for use in other parts of the application
export default Order;
