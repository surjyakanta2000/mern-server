const mongoose = require("mongoose");
const responseSchema = mongoose.Schema({
  assignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
  },
  studentRoll: {
    type: String,
    trim: true,
    required: true,
  },
  studentName: {
    type: String,
    trim: true,
    required: true,
  },
  studentEmail: {
    type: String,
    trim: true,
    required: true,
  },
  assignFile: {
    type: String,
    trim: true,
    required: true,
  },
  dateOfSub: {
    type: String,
    default: new Date().toISOString().slice(0, 10),
  },
});

const Response = mongoose.model("Response", responseSchema);
module.exports = Response;
