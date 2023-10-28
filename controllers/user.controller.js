const User = require("../models/user.model");
const { createToken } = require("../helpers/token.helper");

// Create user
const createUser = async (req, res) => {
  try {
    const { name, email, location, password } = req.body;

    const user = await User.signup(name, email, location, password);

    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

// Get all user
const getAllUser = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }).sort({ createdAt: -1 }).exec();;

    res.status(200).json(users);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  getAllUser
};
