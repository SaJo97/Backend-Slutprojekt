import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { generateToken } from "../lib/generateToken.js";
import ROLES from "../constants/roles.js";

// Controller to handle user registration
export const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // Destructure email and password from request body

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" }); // Send 400 if fields are missing
  }

  const normalizedEmail = email.trim().toLowerCase(); // Normalize email by trimming and converting to lowercase

  // Check if the user already exists
  if (await User.exists({ email: normalizedEmail })) {
    return res.status(409).json({ message: "User  already exists" }); // Send 409 if user already exists
  }

  // Hash the password before saving it to the database
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user in the database
  const user = await User.create({
    email: normalizedEmail, // Save normalized email
    password: hashedPassword, // Save hashed password
  });

  // Generate a token for the newly created user
  const token = generateToken(user);

  // Send back the user ID, email, and token with 201 status
  res.status(201).json({ _id: user._id, email: user.email, token, role: user.role });
});

// Controller to handle user login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // Destructure email and password from request body

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" }); // Send 400 if fields are missing
  }

  // Find the user by email
  const user = await User.findOne({ email }).exec();

  // Check if the user exists
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" }); // Send 401 if user not found
  }

  // Compare the provided password with the stored hashed password
  const match = await bcrypt.compare(password, user.password);

  // Check if the password matches
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" }); // Send 401 if password is incorrect
  }

  // Generate a token for the authenticated user
  const token = generateToken(user);

  // Send back the user ID, email, and token with 200 status
  res.status(200).json({ _id: user._id, email: user.email, token, role: user.role });
});

export const checkToken = asyncHandler(async (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    email: req.user.email,
    role: req.user.role
  })
})

// Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().exec();
  res.status(200).json(users);
});
// Delete a user
export const deleteUser  = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(204).send(); // No content
});
// Update user role
export const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params; 
  const { role } = req.body;
  
  // Check if the role is valid
  if (!Object.values(ROLES).includes(role)) {
    return res.status(400).json({ message: "Invalid role" }); // Return a 400 Bad Request if the role is invalid
  }
  const user = await User.findByIdAndUpdate(id, { role }, { new: true });
  if (!user) {
    return res.status(404).json({ message: "User  not found" }); // Handle case where user is not found
  }
  res.status(200).json(user);
});