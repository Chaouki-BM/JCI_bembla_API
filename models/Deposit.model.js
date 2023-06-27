const mongoose=require('mongoose')
const DepositSchema=new mongoose.Schema({
    Amount:{type:String,required:true},
    Description:{type:String,required:true},
    CodeG:{type:Date,required:true},
},{
    timestamps:{
        createdAt: 'created_at',
    }
})
module.exports=mongoose.model('Deposit',DepositSchema)