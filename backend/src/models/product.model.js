import mongoose from "mongoose";

// Define the schema for a Product
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Name of the product (required)
    price: { type: Number, required: true }, // Price of the product (required)
    description: { type: String, required: true }, // Description of the product (required)
    category: { type: String, required: true }, // Category of the product (required)
    images: { type: [String], required: true }, // Array of image URLs for the product (required)

    createdAt: { type: Date, default: Date.now() }, // Timestamp for when the product was created
    updatedAt: { type: Date, default: Date.now() }, // Timestamp for when the product was last updated
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Create the Product model based on the productSchema
const Product = mongoose.model("Product", productSchema);

// Export the Product model for use in other parts of the application
export default Product;
