const express = require("express");
const auth = require("../middlewares/auth");
const {
  queryBasedSummary,
  generateSummaryFromText,
  summarizeDocument,
  getSummaryById,
  downloadSummaryPdf,
  getUserDocumentSummaries,
} = require("../controllers/summaryController");
const summaryRouter = express.Router();
summaryRouter.post("/", auth, generateSummaryFromText);
summaryRouter.post("/:id/query-based", auth, queryBasedSummary);
summaryRouter.post("/summarize-doc/", auth, summarizeDocument);
summaryRouter.post("/search/", auth, queryBasedSummary);
summaryRouter.get("/:summaryId", auth, getSummaryById);
summaryRouter.get("/:summaryId/download", auth, downloadSummaryPdf);
summaryRouter.get("/all", auth, getUserDocumentSummaries);

module.exports = summaryRouter;
