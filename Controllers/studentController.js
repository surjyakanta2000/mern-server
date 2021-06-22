const Student = require("../Model/studentModel");

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
  const specificStudentData = await Student.findById(req.params.id)
    .populate("studentDept", "-__v")
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
