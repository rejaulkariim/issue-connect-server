require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// User router
const userRouters = require("./routes/user.router");

// Topic router
const createTopicRouter = require("./routes/topic.route");
const addUserResponseRouter = require("./routes/topic.route");
const addAdminResponseRouter = require("./routes/topic.route");
const getUserTopicRouter = require("./routes/topic.route");
const getUserTopicByIdRouter = require("./routes/topic.route");

// Variables
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

// Express app
const app = express();

// Middlewares
app.use(
  cors({
    credentials: true,
  })
);

app.use(express.json());

// Test api
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to issue connect server!" });
});

// Bypassed api endpoint
app.use("/api/users", userRouters);

// Topic response endpoint
app.use("/api/user", createTopicRouter, addUserResponseRouter, getUserTopicByIdRouter);

app.use("/api/admin/topic", addAdminResponseRouter, getUserTopicRouter)

// Mongoose
mongoose.connect(uri, { useUnifiedTopology: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
