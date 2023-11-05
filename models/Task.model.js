const TaskSchema = new mongoose.Schema(
  {
    TaskTitle: { type: String, required: true },
    TaskDescription: { type: String, required: true },
    EventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    Done: { type: Boolean, default: false },
    ResponsibleUser: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
module.exports = mongoose.model("Task", TaskSchema);
