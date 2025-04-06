const { default: mongoose } = require("mongoose");

const docSummarySchema = new mongoose.Schema(
  {
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DocumentModel",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    startPage: {
      type: Number,
      required: true,
      min: 1,
    },
    endPage: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v >= this.startPage;
        },
        message: "End page must be >= start page",
      },
    },
    summary: {
      type: String,
      required: true,
    },
    metadata: {
      documentType: {
        type: String,
        enum: ["general", "legal", "medical", "technical"],
        default: "general",
      },
      summaryLength: {
        type: Number,
        min: 10,
        max: 1000,
      },
      formatPreference: {
        type: String,
        enum: ["outline", "bullet", "paragraph"],
        default: "paragraph",
      },
      focusArea: {
        type: String,
        enum: ["main ideas", "definitions", "concepts"],
        default: "main_ideas",
      },
      generatedAt: {
        type: Date,
        default: Date.now,
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("DocSummary", docSummarySchema);
