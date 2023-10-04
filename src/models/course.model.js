import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
    courseName: {
      type: String,
      required: true,
      trim: true,
    },
    courseCode: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: String,
      trim: [true, "A user must have an email"],
    },
  },
  { timestamps: true }
);

const courseModel = mongoose.model("Course", courseSchema);

export{ courseModel }