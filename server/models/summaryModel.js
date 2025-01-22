const mongoose = require("mongoose")
const textSummarySchema = new mongoose.Schema({
  passage: {
    type: String,
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
  },
  path: {
    type: String,
    default: null,
  }

})
module.exports = mongoose.model("textSummaryModel", textSummarySchema)
