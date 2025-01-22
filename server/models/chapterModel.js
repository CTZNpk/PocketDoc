const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  docId: {
    type: mongoose.Schema.ObjectId,
    ref: "DocumentModel",
  },
  level: {
    type: Number,
    required: true,
  },
  startPageNum: {
    type: Number,
    required: true
  },
  endPageNum: {
    type: Number,
    required: true
  },
  isProcessed: {
    type: Boolean,
    default: false,
  },
  summaryId: {
    type: mongoose.Schema.ObjectId,
    ref: "textSummaryModel",
  },
});
module.exports = mongoose.model("ChapterModel", chapterSchema);

