const mongoose = require("mongoose")
const textSummarySchema = new mongoose.Schema({
  passage: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  modelUsed: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  }
})
module.exports = mongoose.model("textSummaryModel", textSummarySchema)
