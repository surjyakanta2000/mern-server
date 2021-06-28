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
  clsMaterials: [
    {
      materialName: { type: String },
      material: { type: String },
      type: { type: String },
      date: { type: String, default: new Date().toISOString().slice(0, 10) },
    },
  ],
});
const ClassModel = mongoose.model("Class", classSchema);
module.exports = ClassModel;
