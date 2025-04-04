import express from "express";
import cors from "cors";
import productsRouter from "./routes/product.route.js";
import messageRouter from "./routes/message.route.js";
import orderRouter from "./routes/order.route.js";
import authRouter from "./routes/user.routes.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";

const app = express(); // Create an instance of an Express application

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Define routes for different API endpoints
app.use("/api/products", productsRouter); // Route for product-related operations
app.use("/api/message", messageRouter); // Route for message-related operations
app.use("/api/order", orderRouter); // Route for order-related operations
app.use("/api/auth", authRouter); // Route for authentication-related operations

// Middleware to handle 404 Not Found errors
app.use(notFound);

// Middleware to handle errors
app.use(errorHandler);

// Export the Express application for use in other parts of the application
export default app;
