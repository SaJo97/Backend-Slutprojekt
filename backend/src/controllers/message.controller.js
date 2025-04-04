import asyncHandler from "express-async-handler";

export const sendMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All field are required" });
  }

  res.status(200).json({ message: "Message sent successfully" });
});
