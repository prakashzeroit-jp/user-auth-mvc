const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Blacklist = require('../models/Blacklist');
const protect = async (req, res, next) => {
  let token;

  // Check if header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header (Format: "Bearer <token_string>")
      token = req.headers.authorization.split(" ")[1];

      // Check if the token is blacklisted
            const isBlacklisted = await Blacklist.findOne({ token });
            if (isBlacklisted) {
                return res.status(401).json({ message: 'Session expired. Please log in again.' });
            }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token ID and attach to request object
      req.user = await User.findById(decoded.id).select("-password");

      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized, no token provided" });
  }
};

const admin = (req, res, next) => {
  // Change this line to match your exact User model property
  if (req.user && req.user.isAdmin === true) { 
    return next();
  } else {
    return res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect ,admin};
