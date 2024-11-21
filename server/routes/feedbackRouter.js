const express=require('express')
const auth=require('../middlewares/auth')
const { postFeedbackController, getAllFeedbackForUser, getfeedbackByType, deleteUserFeedbackController } = require('../controllers/feedbackController')
const feedbackRouter=express.Router()

feedbackRouter.post('/post-feedback',auth,postFeedbackController)
feedbackRouter.get('/getAllFeedbacks',auth,getAllFeedbackForUser)
feedbackRouter.get('/type/:feedbackType',auth,getfeedbackByType)
feedbackRouter.delete('/deletefeedback/:id',auth,deleteUserFeedbackController)


module.exports=feedbackRouter
