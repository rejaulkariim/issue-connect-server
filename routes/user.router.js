const express = require("express");
const { createUser, loginUser, getAllUser } = require("../controllers/user.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/admin.middleware");

const router = express.Router()

// Register user
router.post("/auth/register", createUser)

// Login User
router.post("/auth/login", loginUser)

// Get all users
router.get("/all", isAuthenticated, isAdmin, getAllUser)


module.exports = router