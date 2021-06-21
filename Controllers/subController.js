const Subject = require("../Model/subModel");

exports.addSubject = async (req, res) => {
  const { subCode, subName, subDept, subSemester } = req.body;
  const subData = await Subject.create({
    subCode,
    subName,
    subDept,
    subSemester,
  });
  res.status(200).json(subData);
};

exports.allSubject = async (req, res) => {
  const subData = await Subject.find({}).populate("subDept", "-__v");
  return res.status(200).json(subData);
};
exports.specSubject = async (req, res) => {
  const subData = await Subject.findById(req.params.id).populate(
    "subDept",
    "-__v"
  );
  return res.status(200).json(subData);
};
exports.updateSubject = async (req, res) => {
  await Subject.findByIdAndUpdate(req.params.id, req.body);
  res.send("Update Successfull..");
};
exports.deleteSubject = async (req, res) => {
  await Subject.findByIdAndDelete(req.params.id);
  res.status(200).send("subject Removed..");
};
exports.getSubForDept = async (req, res) => {
  const subjects = await Subject.find({ subDept: req.params.id }).select(
    "subName"
  );
  res.status(200).json(subjects);
};
