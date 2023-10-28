const express = require("express");
const { createUser, loginUser } = require("../controllers/user.controller");

const router = express.Router()

// Register user
router.post("/auth/register", createUser)

// Login User
router.post("/auth/login", loginUser)


module.exports = router