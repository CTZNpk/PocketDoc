const mongoose = require("mongoose");

const explanationSchema = new mongoose.Schema({
  passage: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modelUsed: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("TextExplanation", explanationSchema);
