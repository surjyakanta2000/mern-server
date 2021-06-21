const mongoose = require("mongoose");
const classSchema = mongoose.Schema({
  clsName: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  clsDept: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Department",
  },
  clsSubject: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Subject",
  },
  clsTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Teacher",
  },
  clsSemester: {
    type: String,
    trim: true,
    required: true,
  },
});
const ClassModel = mongoose.model("Class", classSchema);
module.exports = ClassModel;
