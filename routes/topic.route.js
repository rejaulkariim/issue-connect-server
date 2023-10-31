const express = require("express");
const {
  createTopic,
  addAdminResponse,
  addUserResponse,
  getUserTopic,
  getUserTopicById,
} = require("../controllers/topic.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/admin.middleware");
const { isUser } = require("../middlewares/user.middleware");

const router = express.Router();

// Create router
router.post("/topic/create", isAuthenticated, isUser, createTopic);

// Get all topic
router.get("/topic/all", isAuthenticated, isUser, getUserTopic)
router.get("/topic/:id", isAuthenticated, getUserTopicById)

// User response router
router.post("/topic/:id", isAuthenticated, isUser, addUserResponse);


// Admin response router
router.post(
  "/response/:topicId",
  isAuthenticated,
  isAdmin,
  addAdminResponse
);

module.exports = router;
