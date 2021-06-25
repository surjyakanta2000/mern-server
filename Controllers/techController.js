const Teacher = require("../Model/techModel");
const path = require("path");
const fs = require("fs");
exports.addTeacher = async (req, res) => {
  const { techName, techDept, techEmail, techPhone, techPassword } = req.body;
  await Teacher.create({
    techName,
    techDept,
    techEmail,
    techPhone,
    techPassword,
  });
  res.status(200).send("Teacher Created..");
};

exports.getTeacher = async (req, res) => {
  const allTech = await Teacher.find({})
    .populate("techDept", "-__v")
    .select("-techPassword");
  return res.status(200).json(allTech);
};

exports.specificTeacher = async (req, res) => {
  const specificTechData = await Teacher.findById(req.params.id).populate(
    "techDept",
    "-__v"
  );
  res.status(200).send(specificTechData);
};
exports.updateTeacher = async (req, res) => {
  await Teacher.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).send("teacher updated..");
};
exports.deleteTeacher = async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  res.status(200).send("teacher removed..");
};

exports.updateProfile = async (req, res) => {
  const {
    techName,
    techDept,
    techEmail,
    techPhone,
    techPassword,
    techAddress,
    techDOB,
    techAge,
    techGender,
  } = req.body;
  const { path: profilePic } = req.file;

  const prevStdData = await Teacher.findById(req.params.id);
  if (
    prevStdData.profilePic &&
    prevStdData.profilePic !== undefined &&
    prevStdData.profilePic !== null &&
    prevStdData.profilePic !== profilePic
  ) {
    const deletePic = path.join(__dirname, `../${prevStdData.profilePic}`);
    fs.unlinkSync(deletePic);
  }

  await Teacher.findByIdAndUpdate(req.params.id, {
    techName,
    techDept,
    techEmail,
    techPhone,
    techPassword,
    profilePic,
    techAddress,
    techDOB,
    techAge,
    techGender,
  });
  res.status(200).send("Teacher Profile updated..");
};
