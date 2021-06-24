const Assignment = require("../Model/assignModel");
const Response = require("../Model/responseModel");
const fs = require("fs");

exports.addAssignment = async (req, res) => {
  const { assignClass, assignName } = req.body;
  const { path: assignFile } = req.file;

  try {
    await Assignment.create({ assignClass, assignName, assignFile });
    res.status(200).json({
      message: "new assignment added!!",
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.getAssignment = async (req, res) => {
  const { id } = req.params;
  const assignments = await Assignment.find({ assignClass: id });
  res.status(200).json(assignments);
};

exports.deleteAssignment = async (req, res) => {
  const { assignFile } = await Assignment.findById(req.params.id);
  await Assignment.findByIdAndDelete(req.params.id);
  fs.unlink(assignFile, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  res.status(200).json({ message: "deleted success" });
};

exports.addStudentRes = async (req, res) => {
  const { assignId, studentRoll, studentName, studentEmail } = req.body;
  const { path: assignFile } = req.file;
  try {
    await Response.create({
      assignId,
      studentRoll,
      studentName,
      studentEmail,
      assignFile,
    });
    res.status(200).json({
      message: "new response added!!",
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.getResponses = async (req, res) => {
  const responses = await Response.find({ assignId: req.params.id });
  res.status(200).json(responses);
};
