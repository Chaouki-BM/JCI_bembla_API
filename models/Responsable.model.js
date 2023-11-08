const mongoose = require("mongoose");
const ResponsableSchema = new mongoose.Schema(
  {
    EventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    Role: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
module.exports = mongoose.model("Responsable", ResponsableSchema);
