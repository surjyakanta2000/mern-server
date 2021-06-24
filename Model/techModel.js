const mongoose = require("mongoose");
const techSchema = mongoose.Schema({
  techName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  techDept: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Department",
  },
  techEmail: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  techPhone: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  techPassword: {
    type: String,
    trim: true,
    required: true,
  },
  profilePic: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    lowercase: true,
    default: "teacher",
  },
});
const Teacher = mongoose.model("Teacher", techSchema);
module.exports = Teacher;
