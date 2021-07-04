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
  techAddress: {
    type: String,
    trim: true,
    default: "",
  },
  techDOB: {
    type: String,
    trim: true,
    default: "",
  },
  techAge: {
    type: String,
    trim: true,
    default: "",
  },
  techGender: {
    type: String,
    trim: true,
    default: "",
  },
  role: {
    type: String,
    required: true,
    lowercase: true,
    default: "teacher",
  },
  securityQuestion: {
    type: String,
    default: "",
  },
  securityAnswer: {
    type: String,
    default: "",
  },
});
const Teacher = mongoose.model("Teacher", techSchema);
module.exports = Teacher;
