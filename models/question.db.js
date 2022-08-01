const mongoose = require("mongoose")


const QuestionSchema = mongoose.Schema({
   companyId:{
    type:String,
    required:false
   },
   question:{
    type:String,
    required:false
   },
}, {timestamps:true})

module.exports = mongoose.model("Question", QuestionSchema)
