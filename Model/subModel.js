const mongoose = require("mongoose");
const subSchema = mongoose.Schema({
  subCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  subName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  subDept: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Department",
  },
  subSemester: {
    type: String,
    required: true,
    trim: true,
  },
});
const Subject = mongoose.model("Subject", subSchema);
module.exports = Subject;
