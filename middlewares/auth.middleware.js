const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw new Error("Invalid token formate");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new Error("Token not found");
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(id);

    next();
  } catch (error) {
    if (error.name === "jsonWebTokenError") {
      res.status(401).json({ error: "Invalid token" });
    } else {
      res.status(403).json({ error: "Unauthorized access" });
    }
  }
};

module.exports = { isAuthenticated };