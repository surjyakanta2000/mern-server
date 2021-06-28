const Student = require("../Model/studentModel");
const fs = require("fs");
const path = require("path");

exports.addStudent = async (req, res) => {
  const {
    studentRoll,
    studentName,
    studentDept,
    studentSemester,
    studentEmail,
    studentPhone,
    studentPassword,
  } = req.body;
  await Student.create({
    studentRoll,
    studentName,
    studentDept,
    studentSemester,
    studentEmail,
    studentPhone,
    studentPassword,
  });
  res.status(200).send("Student Created..");
};
exports.getStudent = async (req, res) => {
  const allStudent = await Student.find({})
    .populate("studentDept", "-__v")
    .select("-studentPassword");
  return res.status(200).json(allStudent);
};
exports.specificStudent = async (req, res) => {
  const specificStudentData = await Student.findById(req.params.id).populate(
    "studentDept",
    "-__v"
  );
  res.status(200).send(specificStudentData);
};
exports.updateStudent = async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).send("Student updated..");
};
exports.deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.status(200).send("Student removed..");
};
exports.getStudentForClass = async (req, res) => {
  const { dept, sem } = req.params;
  const specificStudentData = await Student.find({
    studentDept: dept,
    studentSemester: sem,
  }).select("-studentPassword");
  res.status(200).send(specificStudentData);
};

exports.getStudentByRoll = async (req, res) => {
  const student = await Student.findOne({
    studentRoll: req.params.roll,
  }).select("studentDept studentSemester");
  return student;
};

exports.updateProfile = async (req, res) => {
  const {
    studentRoll,
    studentName,
    studentDept,
    studentSemester,
    studentEmail,
    studentPhone,
    studentPassword,
  } = req.body;
  const { path: profilePic } = req.file;

  const prevStdData = await Student.findById(req.params.id);
  if (
    prevStdData.profilePic &&
    prevStdData.profilePic !== undefined &&
    prevStdData.profilePic !== null &&
    prevStdData.profilePic !== profilePic
  ) {
    const deletePic = path.join(__dirname, `../${prevStdData.profilePic}`);
    fs.unlinkSync(deletePic);
  }

  await Student.findByIdAndUpdate(req.params.id, {
    studentRoll,
    studentName,
    studentDept,
    studentSemester,
    studentEmail,
    studentPhone,
    studentPassword,
    profilePic,
  });
  res.status(200).send("Student Profile updated..");
};
