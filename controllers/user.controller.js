const User = require("../models/user.model");

// Create user
const createUser = async (req, res) => {
  try {
    const { name, email, location, password } = req.body;

    const user = await User.signup(name, email, location, password);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const loginUser = async (req, res) => {};

module.exports = {
  createUser,
  loginUser,
};
