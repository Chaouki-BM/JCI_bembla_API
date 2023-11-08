const { boolean } = require("joi");
const mongoose = require("mongoose");
const PresenceSchema = new mongoose.Schema(
  {
    MeetId: { type: mongoose.Schema.Types.ObjectId, ref: "Meet" },
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    Present: { type: Boolean, required: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
module.exports = mongoose.model("Presence", PresenceSchema);
