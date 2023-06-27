const mongoose=require('mongoose')
const SponsoringSchema=new mongoose.Schema({
    SName:{type:String,required:true},
    SPlace:{type:String,required:true},
    SPhone:{type:String,required:true},
})
module.exports=mongoose.model('Sponsoring',SponsoringSchema)