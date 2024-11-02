const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  file: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  uploadedByUserId: {
    type: mongoose.Schema.ObjectId,
    ref: "UserModel",
  },
  uploadedDate: {
    type: Date,
    default: Date.now,
  },
  summary: {
    type: String,
  },
  processed: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("DocumentModel", documentSchema);
