const User = require("../models/user.model");
const{createToken} = require("../helpers/token.helper")

// Create user
const createUser = async (req, res) => {
  try {
    const { name, email, location, password } = req.body;

    const user = await User.signup(name, email, location, password);

    const token = createToken(user._id)

    res.status(200).json({user, token});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body

    const user = await User.login(email, password)

    const token = createToken(user._id)

    res.status(200).json({user, token})

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
};
