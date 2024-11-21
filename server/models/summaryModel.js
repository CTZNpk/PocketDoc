const mongoose = require("mongoose")
const summarySchema = new mongoose.Schema({
  //TODO MAKE IT NULLABLE Because can be text based summary
  documentId: {
    type: mongoose.Schema.ObjectId,
    ref: "DocumentModel"
  },
  content: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  queryBased: {
    type: Boolean,
    default: false
  },
})
module.exports = mongoose.model("SummaryModel", summarySchema)
