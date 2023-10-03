import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: [true, "A user must have an email"],
    },
    password: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      max: 11,
    },
    username: {
      type: String,
      required: true
    },
    courseId: {
      type: Array,
      of: "string"
    },
    profile_img: {
      type: String,
    },
    studentBarcode: {
        type : String,
    },
    role: {
        type: String,
        enum: ["teacher", "student", "admin"],
        default: "student",
    }
  },
  { timestamps: true }
);

// Encrypt password before pushing to database
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (password) {
  if (!password) throw new Error("Password is missing, can not compare");

  try {
    // console.log(password);
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (e) {
      return res.json({ 
        Success: false, 
        message: 'Error while comparing password!', 
        error: e.message})
  }
};

userSchema.methods.toJSON = function () {
  const userData = this.toObject();

  delete userData.password;
  return userData;
};

const userModel = mongoose.model("User", userSchema);

export{ userModel }
