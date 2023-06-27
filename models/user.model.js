const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    Email:{type:String,required:true},
    Password:{type:String,required:true},
    FullName:{type:String,required:true},
    DateN:{type:Date,required:true},
    DateI:{type:Date,required:true},
    cin:{type:String,required:false},
    role:{type:String,required:true}

},{
    timestamps:true
})
module.exports=mongoose.model('User',UserSchema)