const express = require("express");
const {
  createTopic,
  addAdminResponse,
  addUserResponse,
  getUserTopic,
  getUserTopicById,
  getAllTopicAdmin,
} = require("../controllers/topic.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/admin.middleware");
const { isUser } = require("../middlewares/user.middleware");

const router = express.Router();

// Create router (user)
router.post("/topic/create", isAuthenticated, isUser, createTopic);

// Get all topic (user)
router.get("/topic/all", isAuthenticated, isUser, getUserTopic);
router.get("/topic/:id", isAuthenticated, getUserTopicById);
// User response (user)
router.post("/topic/:id", isAuthenticated, isUser, addUserResponse);

// Get all topic (admin)
router.get("/issue/all", isAuthenticated, isAdmin, getAllTopicAdmin);
// Response to issue (admin)
router.post("/issue/:id", isAuthenticated, isAdmin, addAdminResponse);

module.exports = router;
