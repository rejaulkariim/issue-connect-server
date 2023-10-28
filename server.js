require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRouters = require("./routes/user.router")


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

// Bypassed api
app.use("/api/user", userRouters)


// Mongoose
mongoose.connect(uri, { useUnifiedTopology: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
