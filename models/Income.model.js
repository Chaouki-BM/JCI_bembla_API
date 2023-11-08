const mongoose=require('mongoose')
const IncomeSchema=new mongoose.Schema({
    Source:{type: mongoose.Schema.Types.ObjectId, ref: 'Sponsoring'},
    Amount:{type:String,required:true},
    CodeG:{type:Date,required:true},
},{
    timestamps:{
        createdAt: 'created_at',
    }
})
module.exports=mongoose.model('Income',IncomeSchema)