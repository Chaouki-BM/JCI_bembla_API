const mongoose = require("mongoose");
const MeetSchema = new mongoose.Schema(
  {
    Description : { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
module.exports = mongoose.model("Meet", MeetSchema);
