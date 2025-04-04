import jwt from "jsonwebtoken";

// Function to generate a JSON Web Token (JWT) for a user
export const generateToken = (user) => {
  return jwt.sign(
    {
      userInfo: {
        // Payload containing user information
        _id: user._id, // User's unique ID
        email: user.email, // User's email
      },
    },
    process.env.ACCESS_TOKEN_SECRET, // Secret key for signing the token from environment variables
    { expiresIn: "1h" } // Set token expiration time to 1 hour
  );
};
