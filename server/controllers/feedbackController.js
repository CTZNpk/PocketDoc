const feedBackModel = require("../models/feedBackModel");

exports.postFeedbackController = async (req, res) => {
  const { userId, summaryId, quizId, feedbackType, content, rating } = req.body;
  try {
    if (!content || !rating || !feedbackType) {
      res.status(400).json({ error: "Cannot Post Empty Feedback" });
    }
    const feedback = new feedBackModel({
      userId,
      summaryId,
      quizId,
      feedbackType,
      content,
      rating,
      submittedAt: Date.now(),
    });
    await feedback.save();
    res.status(200).json({ message: "Feedback Posted Successfully", feedback });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Errro in Posting FeedbackController ${error}` });
  }
};
exports.getAllFeedbackForUser=async(req,res)=>{
    try {
        const feedbacks=await feedBackModel.find({userId:req.user.id}).populate("userId",'email').populate("quizId").populate("summaryId")
        res.status(200).json({feedbacks});
        
    } catch (error) {
        res.status(500).json({error:`Error in Getting Feedbacks for User Controller: ${error}`})
    }
}
exports.getfeedbackByType=async (req,res) => {
    const {feedbackType}=req.params
    try {
        const feedback=await feedBackModel.find({feedbackType:feedbackType})
        if(feedback.length===0){
            res.status(404).json({error:"NOT FOUND WITH SUCH TYPE"})
        }
        else{
            res.status(200).json({feedback});
        }
    } catch (error) {
        res.status(500).json({error:`Error in Getting feedback by type Controller: ${error}`})
        
    }
    
}

exports.deleteUserFeedbackController=async(req,res)=>{
    const {id}=req.params
    try {
        const feedback=await feedBackModel.findOneAndDelete({_id:id,userId:req.user.id});
        if(!feedback){
            res.status(404).json({error:"NO FEEDBACK FOUND"})
        }
        res.status(200).json({message:"Successfully deleted"});
    } catch (error) {

        res.status(500).json({error:`ERROR IN DELETING FEEDBACK ${error}`});
    }
}