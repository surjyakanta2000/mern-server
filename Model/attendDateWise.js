const mongoose = require("mongoose");

const attendSchema = mongoose.Schema({
  clsCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  clsDate: {
    type: String,
  },
  data: [
    {
      studentRoll: {
        type: String,
      },
      studentName: {
        type: String,
      },
      status: {
        type: String,
      },
    },
  ],
});

const AttendDateWise = mongoose.model("AttendDateWise", attendSchema);

module.exports = AttendDateWise;
