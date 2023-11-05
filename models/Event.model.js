const mongoose=require('mongoose')
const EventSchema = new mongoose.Schema(
  {
    Responsible: { type: String, required: true },
    title: { type: String, required: true },
    Description: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
module.exports=mongoose.model('Event',EventSchema)