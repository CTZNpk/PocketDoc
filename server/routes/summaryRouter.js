const express = require("express");
const auth = require("../middlewares/auth");
const {
  queryBasedSummary,
  summarizeChapters,
  generateSummaryFromText,
  summarizeDocumentPages,
} = require("../controllers/summaryController");
const summaryRouter = express.Router();
summaryRouter.post("/", generateSummaryFromText);
summaryRouter.post("/:id/query-based", auth, queryBasedSummary);
summaryRouter.get("/:id/", auth, summarizeChapters);
summaryRouter.post("/summarize-doc/", auth, summarizeDocumentPages);

module.exports = summaryRouter;
