const jwt = require('jsonwebtoken');
const User =require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ msg: 'No token provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user =  await User.findById(decoded.id).select('-password'); // Assuming the token contains a user ID in the payload
    next();

  } catch (err) {
    console.error("Token verification error:", err);  // Log the error message
    res.status(500).json({ msg: 'Server error', error: err.message }); // Include the error message for debugging
  }
};

module.exports = authMiddleware;
