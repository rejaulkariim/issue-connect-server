const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
 
    isAdminResponse: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    responses: [responseSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", topicSchema);
