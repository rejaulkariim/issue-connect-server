const Topic = require("../models/topic.model");
const User = require("../models/user.model")

// Create topic for user
const createTopic = async (req, res) => {
  try {
    const userId = req.user._id;

    const { title, message } = req.body;

    if (!title || !message) {
      throw new Error("All filds are required");
    }

    const topic = await Topic.create({ title, message, user: userId });
    res.status(201).json(topic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Add a user response to a topic
const addUserResponse = async (req, res) => {
  try {
    const topicId = req.params.id;
    const { content } = req.body;
    const userId = req.user._id;

    if (!content) {
      throw new Error("Response content is required");
    }

    const topic = await Topic.findById({ _id: topicId });

    if (!topic) {
      throw new Error("Topic not found");
    }

    // Add the user response to the responses array of the topic
    topic.responses.push({
      content,
      user: userId,
      isAdminResponse: false,
    });

    await topic.save();

    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add an admin response to a topic
const addAdminResponse = async (req, res) => {
  try {
    const topicId = req.params.id;
    const { content } = req.body;
    const adminId = req.user._id;

    if (!content) {
      throw new Error("Response content is required");
    }

    const topic = await Topic.findById(topicId);

    if (!topic) {
      throw new Error("Topic not found");
    }

    // Add the admin response to the responses array of the topic
    topic.responses.push({
      content,
      user: adminId,
      isAdminResponse: true,
    });

    await topic.save();

    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all topic for (user)
const getUserTopic = async (req, res) => {
  try {
    const userId = req.user._id;
    const topics = await Topic.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all topic for (Admin)
const getAllTopicAdmin = async (req, res) => {
  try {

    const topics = await Topic.find({}).sort({ createdAt: -1 }).populate('user');;

    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific topic for user
const getUserTopicById = async (req, res) => {
  try {
    const id = req.params.id;

    const topic = await Topic.findById({ _id: id });

    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTopic,
  addUserResponse,
  addAdminResponse,
  getUserTopic,
  getUserTopicById,
  getAllTopicAdmin
};
