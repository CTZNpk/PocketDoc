const express = require("express")
const auth = require("../middlewares/auth")
const { queryBasedSummary, summarizeEntireDocController, generateSummaryFromText } = require("../controllers/summaryController")
const summaryRouter = express.Router()
summaryRouter.post('/', generateSummaryFromText)
summaryRouter.post('/:id/query-based', auth, queryBasedSummary)
summaryRouter.post('/:id/summarize', auth, summarizeEntireDocController)

module.exports = summaryRouter
