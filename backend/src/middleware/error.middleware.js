// Middleware function to handle 404 Not Found errors
export const notFound = (req, res, next) => {
  // Create a new error with a message indicating the requested URL was not found
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404); // Set the response status to 404
  next(error); // Pass the error to the next middleware (error handler)
};

// Middleware function to handle errors
export const errorHandler = (err, req, res, next) => {
  console.log(`Error: ${err.message}`); // Log the error message to the console

  // Determine the status code to send in the response
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // If status is 200, set it to 500 (Internal Server Error)

  // Send a JSON response with the error message and stack trace (if in development mode)
  res.status(statusCode).json({
    message: err.message, // Include the error message
    stack: process.env.NODE_ENV === "development" ? err.stack : null, // Include stack trace only in development
  });
};
