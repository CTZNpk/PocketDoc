const express=require("express")
const auth = require("../middlewares/auth")
const { queryBasedSummary, summarizeEntireDocController } = require("../controllers/summaryController")
const summaryRouter=express.Router()
summaryRouter.post('/:id/query-based',auth,queryBasedSummary)
summaryRouter.post('/:id/summarize',auth,summarizeEntireDocController)

module.exports=summaryRouter