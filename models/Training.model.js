const mongoose=require('mongoose')
const TrainingSchema=new mongoose.Schema({
    // NameFormer:{type: mongoose.Schema.Types.ObjectId, ref: 'Former'},
    NameFormer:{type:String,required:true},
    Description:{type:String,required:true},
    DateT:{type:String,required:true},
},{
    timestamps:{
        createdAt: 'created_at',
    }
})
module.exports=mongoose.model('Training',TrainingSchema)