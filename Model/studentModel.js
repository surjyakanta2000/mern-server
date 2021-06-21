const mongoose = require("mongoose");
const studentSchema = mongoose.Schema({
  studentRoll: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    uppercase: true,
  },
  studentName: {
    type: String,
    required: true,
    trim: true,
  },
  studentDept: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Department",
  },
  studentSemester: {
    type: String,
    trim: true,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  studentPhone: {
    type: String,
    required: true,
    trim: true,
  },
  studentPassword: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "student",
  },
});
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
