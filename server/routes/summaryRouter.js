const express = require("express");
const auth = require("../middlewares/auth");
const {
  queryBasedSummary,
  generateSummaryFromText,
  summarizeDocumentPages,
  storeSummaryDocument,
  fetchUserSummaryHistories,
} = require("../controllers/summaryController");
const summaryRouter = express.Router();
summaryRouter.post("/", auth, generateSummaryFromText);
summaryRouter.post("/:id/query-based", auth, queryBasedSummary);
summaryRouter.post("/summarize-doc/", auth, summarizeDocumentPages);
summaryRouter.post("/store-summary-doc", auth, storeSummaryDocument);
summaryRouter.get("/all-summaries", fetchUserSummaryHistories);

module.exports = summaryRouter;
