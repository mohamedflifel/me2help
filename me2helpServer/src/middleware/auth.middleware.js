// Import the jsonwebtoken library to work with JWTs
const jwt = require('jsonwebtoken');

// Define the middleware function called "protect"
const protect = (req, res, next) => {
  // Get the token from the HttpOnly cookie
  // const token = req.cookies?.token;
    const token = req.cookies?.token;
    console.log('All cookies:', req.cookies);   // Debugging log
    console.log('Token from cookie:', token);   // Debugging log
  // If no token is provided, return a 401 Unauthorized response
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
    return; // stop execution here
  }

  try {
    // Verify the token using the secret key stored in environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded payload (user info) to the request object
    req.user = decoded;

    // Call next() to pass control to the next middleware or route handler
    next();
  } catch (err) {
    // If verification fails (invalid or expired token), return a 401 Unauthorized response
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};

// Export the middleware so it can be used in routes
module.exports = protect;
