const mongoose=require('mongoose')
const quizResultSchema=new mongoose.Schema({
    quizId:{
        type:mongoose.Schema.ObjectId,
        ref:"QuizModel"
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"UserModel"
    },
    score:{
        type:Number,
        default:0
    },
    completedAt:{
        type:Date,
        }
})
module.exports=mongoose.model("QuizResultModel",quizResultSchema)