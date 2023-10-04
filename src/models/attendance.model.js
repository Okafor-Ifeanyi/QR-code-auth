import mongoose from "mongoose"

const attendanceSchema = new mongoose.Schema({
    userId : {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Active", "Dormant"],
      default: "Active"
    }
  },
  { timestamps: false}
);

attendanceSchema.add({
    markedIn: { type: Date, default: Date.now },
    markedOut: { type: Date },
  });

const attendanceModel = mongoose.model("Attendance", attendanceSchema);

export{ attendanceModel }