const mongoose = require("mongoose");
const attendSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  clsCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  totalCls: {
    type: Number,
    default: 0,
  },
  attendedCls: {
    type: Number,
    default: 0,
  },
  classTakenDate: {
    type: String,
  },
});

const AttendModel = mongoose.model("Attendance", attendSchema);
module.exports = AttendModel;
