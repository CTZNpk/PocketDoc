const mongoose=require('mongoose')
const feebackSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"UserModel"
    },
    content:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        default:0
    },
    submittedAt:{
        type:Date,
    required:true
    }
})

module.exports=mongoose.model("FeedbackModel",feebackSchema)
//summary uid