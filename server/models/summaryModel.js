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


const docSummarySchema = new mongoose.Schema({
  documentId: { 
    type: String, 
    required: true,
    index: true 
  },
  filePath: {
    type: String,
    required: true
  },
  startPage: {
    type: Number,
    required: true,
    min: 1
  },
  endPage: {
    type: Number,
    required: true,
    validate: {
      validator: function(v) {
        return v >= this.startPage;
      },
      message: 'End page must be >= start page'
    }
  },
  summary: {
    type: String,
    required: true
  },
  metadata: {
    documentType: {
      type: String,
      enum: ['general', 'legal', 'medical', 'technical'],
      default: 'general'
    },
    summaryLength: {
      type: Number,
      min: 10,
      max: 1000
    },
    formatPreference: {
      type: String,
      enum: ['paragraph', 'bullet_points', 'headings'],
      default: 'paragraph'
    },
    focusArea: {
      type: String,
      enum: ['main ideas', 'key points', 'examples', 'all'],
      default: 'main ideas'
    },
    generatedAt: {
      type: Date,
      default: Date.now
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('DocSummary', docSummarySchema);