import mongoose from "mongoose";

// Define the schema for a User
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String, // The type of the email field is String
      required: true, // This field is required
      unique: true, // This field must be unique across all users
      lowercase: true, // Convert the email to lowercase before saving
    },
    password: {
      type: String, // The type of the password field is String
      required: true, // This field is required
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Create the User model based on the userSchema
const User = mongoose.model("User", userSchema);

// Export the User model for use in other parts of the application
export default User;
