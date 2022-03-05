const expressAsyncHandler = require('express-async-handler');
const res = require('express/lib/response');
const User = require('../Models/userModel');

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(404);
    throw new Error('Please enter all the fields');
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(404);
    throw new Error('User already exists');
  }
  const user = await User.create({ name, email, password, pic });
  if (user) {
    res.status(201).json(user);
  } else {
    res.status(404);
    throw new Error('Failed to create user');
  }
});

module.exports = { registerUser };
