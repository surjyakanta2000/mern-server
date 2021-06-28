const Assignment = require("../Model/assignModel");
const fs = require("fs");

exports.addAssignment = async (req, res) => {
  const { assignClass, assignName, lastDate } = req.body;
  const { path: assignFile } = req.file;

  try {
    await Assignment.create({ assignClass, assignName, lastDate, assignFile });
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

exports.getAssignmentSpec = async (req, res) => {
  const { id } = req.params;
  const assignment = await Assignment.findById(id).select("-assignFile");
  res.status(200).json(assignment);
};

exports.deleteAssignment = async (req, res) => {
  const { assignFile, responses } = await Assignment.findById(req.params.id);
  await Assignment.findByIdAndDelete(req.params.id);
  fs.unlink(assignFile, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  console.log(responses);
  res.status(200).json({ message: "deleted success" });
};

exports.addStudentRes = async (req, res) => {
  const {
    assignId,
    studentRoll,
    studentName,
    studentEmail,
    lastDate,
    dateOfSub,
  } = req.body;
  const { path: assignFile } = req.file;
  try {
    const { responses } = await Assignment.findById(assignId);

    await Assignment.findByIdAndUpdate(assignId, {
      responses: [
        ...responses,
        {
          assignId,
          studentRoll,
          studentName,
          studentEmail,
          assignFile,
          dateOfSub: dateOfSub > lastDate ? dateOfSub + " due" : dateOfSub,
        },
      ],
    });
    res.status(200).json({
      message: "new response added!!",
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.getResponses = async (req, res) => {
  const { responses } = await Assignment.findById(req.params.id);
  res.status(200).json(responses);
};
