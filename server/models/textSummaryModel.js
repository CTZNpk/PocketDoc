const mongoose = require("mongoose");

const textSummarySchema = new mongoose.Schema({
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
  summary: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("TextSummary", textSummarySchema);
