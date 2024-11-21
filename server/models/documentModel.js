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
  //TODO: Maybe give the document a Genre because then we would be able to check which genre our llm is summarizing well and which should be trained more
  // We would generate genre of the document from the llm as well 
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
  //TODO Convert to Summary ID maybe and nullable = true
  summary: {
    type: String,
  },
  processed: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("DocumentModel", documentSchema);
