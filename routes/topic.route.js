const express = require("express");
const {
  createTopic,
  addAdminResponse,
  addUserResponse,
  getUserTopic,
} = require("../controllers/topic.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/admin.middleware");
const { isUser } = require("../middlewares/user.middleware");

const router = express.Router();

// Create router
router.post("/create", isAuthenticated, isUser, createTopic);

// Get all topic
router.get("/all", isAuthenticated, isAdmin, getUserTopic)

// User response router
router.post("/:topicId", isAuthenticated, isUser, addUserResponse);


// Admin response router
router.post(
  "/response/:topicId",
  isAuthenticated,
  isAdmin,
  addAdminResponse
);

module.exports = router;
