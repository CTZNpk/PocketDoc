const express = require("express");
const auth = require("../middlewares/auth");
const {
  queryBasedSummary,
  generateSummaryFromText,
  fetchUserSummaryHistories,
  summarizeDocument,
} = require("../controllers/summaryController");
const summaryRouter = express.Router();
summaryRouter.post("/", auth, generateSummaryFromText);
summaryRouter.post("/:id/query-based", auth, queryBasedSummary);
summaryRouter.post("/summarize-doc/", auth, summarizeDocument);
summaryRouter.get("/all", auth, fetchUserSummaryHistories);
summaryRouter.post("/search/", auth, queryBasedSummary);

module.exports = summaryRouter;
