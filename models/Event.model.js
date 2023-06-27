const mongoose=require('mongoose')
const EventSchema=new mongoose.Schema({
    Responsible:{type:String,required:true},
    title:{type:String,required:true},
    Description:{type:String,required:true},
    Picture:{type:String,required:true},
    committee:{type: mongoose.Schema.Types.Array, ref: 'User'},
    

},{
    timestamps:{
        createdAt: 'created_at',
    }
})
module.exports=mongoose.model('Event',EventSchema)