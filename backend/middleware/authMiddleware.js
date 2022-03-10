const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.header.authorization &&
    req.header.authorization.startswith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // decoded token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (err) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }
});

module.exports = { protect };
