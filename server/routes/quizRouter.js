const express = require('express')
const auth = require('../middlewares/auth');
const { generateQuiz, userCompletesQuiz, getUserQuizHistory } = require('../controllers/quizController')
const quizRouter = express.Router()
quizRouter.post('/generate', auth, generateQuiz)
//TODO Better name of below route :) 
quizRouter.post('/completes-quiz', auth, userCompletesQuiz)
quizRouter.get('/quiz-history', auth, getUserQuizHistory)
module.exports = quizRouter
