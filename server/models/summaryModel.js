const mongoose=require("mongoose")
const summarySchema=new mongoose.Schema({
    documentId:{
        type:mongoose.Schema.ObjectId,
        ref:"DocumentModel"
    },
    content:{
        type:String,
        required:true,
    },
    createdDate:{
        type:Date,
        default:Date.now

    },
    queryBased:{
        type:Boolean,
        default:false
    },

})
module.exports=mongoose.model("SummaryModel",summarySchema)
