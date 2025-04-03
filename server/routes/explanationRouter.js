const express = require("express");
const auth = require("../middlewares/auth");
const {
  generateExplanationForText,
} = require("../controllers/explanationController");

const explanationRouter = express.Router();

explanationRouter.post("/", auth, generateExplanationForText);

module.exports = explanationRouter;
