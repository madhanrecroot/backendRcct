const mongoose = require("mongoose")


const AnswerSchema = mongoose.Schema({
   questionId:{
    type:String,
    required:false
   },
   question:{
    type:String,
    required:false
   },
    answer:{
        type:String,
        required:true
    }
}, {timestamps:true})

module.exports = mongoose.model("Answer", AnswerSchema)
