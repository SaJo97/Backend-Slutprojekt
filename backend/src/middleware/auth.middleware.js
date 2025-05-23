import jwt from "jsonwebtoken";

// Middleware function to verify the JSON Web Token (JWT)
export const verifyToken = (req, res, next) => {
  try {
    // Get the authorization header from the request
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // Check if the authorization header is present and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401) // Send 401 Unauthorized if no token is provided
        .json({ message: "Not authenticated. No token provided!" });
    }

    // Extract the token from the authorization header
    const token = authHeader.split(" ")[1];

    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded.userInfo;
    req.userId = decoded.userInfo;
    // req.userRole = decoded.userInfo.role;

    // Call the next middleware function in the stack
    next();
  } catch (err) {
    // Send 401 Unauthorized if token verification fails
    return res.status(401).json({ message: "Not Authenticated" });
  }
};

export const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if(!req.user.role){
      return res.status(403).json({message: `Access denied: No roles assigned`})
    }

    // if (!allowedRoles.includes(req.userRole)) {
    //   return res.status(403).json({ message: `Access denied: Requires role (${allowedRoles.join(', ')})` });
    // }
    if(!allowedRoles.some(role => req.user.role === role)){
      return res.status(403).json({message: `Access denied: Requires role (${allowedRoles.join(', ')})`})
    }

    next()
}}
