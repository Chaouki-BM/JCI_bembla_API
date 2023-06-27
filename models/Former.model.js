const mongoose=require('mongoose')
const FormerSchema=new mongoose.Schema({
    FullName:{type:String,required:true},
    Phone:{type:String,required:true},
    Speciality:{type:String,required:true},

})
module.exports=mongoose.model('Former',FormerSchema)