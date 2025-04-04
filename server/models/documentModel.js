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
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "UserModel",
  },
  hasEmbeddings: {
    type: Boolean,
    default: false,
  },
  uploadedDate: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("DocumentModel", documentSchema);
