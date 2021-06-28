const mongoose = require("mongoose");

const assignSchema = mongoose.Schema({
  assignClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  assignName: {
    type: String,
    trim: true,
    required: true,
  },
  assignFile: {
    type: String,
    trim: true,
    required: true,
  },
  assignDate: {
    type: String,
    default: new Date().toISOString().slice(0, 10),
  },
  lastDate: {
    type: String,
  },
  responses: [
    {
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
      },
    },
  ],
});

const Assignment = mongoose.model("Assignment", assignSchema);
module.exports = Assignment;
