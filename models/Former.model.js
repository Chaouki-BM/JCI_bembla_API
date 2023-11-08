const mongoose=require('mongoose')
const FormerSchema = new mongoose.Schema({
  FullName: { type: String, required: true },
  Phone: { type: String, required: true },
  Speciality: { type: String, required: true },
  Trainings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Training" }],
});
module.exports=mongoose.model('Former',FormerSchema)