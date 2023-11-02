require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http"); 
const socketIo = require("socket.io");

// User router
const userRouters = require("./routes/user.router");

// Topic router
const createTopicRouter = require("./routes/topic.route");
const addUserResponseRouter = require("./routes/topic.route");
const addAdminResponseRouter = require("./routes/topic.route");
const getUserTopicRouter = require("./routes/topic.route");
const getUserTopicByIdRouter = require("./routes/topic.route");
// Get all topic (Admin)
const getAllTopicAdminRouter = require("./routes/topic.route");

// Variables
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

// Express app
const app = express();

// Create an HTTP server using the Express app
const server = http.createServer(app); // Attach the app to the server

// Create a Socket.IO instance attached to the server
const io = socketIo(server,{ cors: {
  origin: 'https://issue-client-server.onrender.com',
  methods:['GET','POST']
}});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("new-topic", (data) => {
    
    const notificationData = {
      user: data.user, 
      topic: data.topic,
    };

    io.emit("new-topic", notificationData);
    console.log("new topic: ", notificationData);
  });

  socket.on("new-message", (data) => {
    // Handle new message data and emit it to clients
    io.emit("new-message", data);
    console.log("new message: ", data);
  });


  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

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

app.use("/api/admin", addAdminResponseRouter, getUserTopicRouter, getAllTopicAdminRouter)

// Mongoose
mongoose.connect(uri, { useUnifiedTopology: true }).then(() => {
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
