const express = require('express')
const auth = require('../middlewares/auth')
const { postFeedbackController, getAllFeedbackForUser, getfeedbackByType, deleteUserFeedbackController } = require('../controllers/feedbackController')
const feedbackRouter = express.Router()

feedbackRouter.post('/post-feedback', auth, postFeedbackController)
feedbackRouter.get('/getAllFeedbacks', auth, getAllFeedbackForUser)
feedbackRouter.get('/type/:feedbackType', auth, getfeedbackByType)
feedbackRouter.delete('/deletefeedback/:id', auth, deleteUserFeedbackController)
//TODO Retrieve feedback by feedback rating maybe inside feedback type
//We would want to retrieve the feedback of 
//summary -> with a specific rating 
//quiz -> with a specific rating 



module.exports = feedbackRouter
