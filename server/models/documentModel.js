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
  uploadedDate: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("DocumentModel", documentSchema);
