const ClassModel = require("../Model/classModel");
const path = require("path");
const fs = require("fs");
exports.addClass = async (req, res) => {
  const { clsName, clsDept, clsSubject, clsTeacher, clsSemester } = req.body;
  await ClassModel.create({
    clsName,
    clsDept,
    clsSubject,
    clsTeacher,
    clsSemester,
  });
  res.status(200).send("Class Created..");
};

exports.getClsForTeacher = async (req, res) => {
  const classes = await ClassModel.find({ clsTeacher: req.params.id }).populate(
    "clsSubject",
    "subCode"
  );
  res.status(200).json(classes);
};
exports.getClsForDept = async (req, res) => {
  const classes = await ClassModel.find({ clsDept: req.params.id })
    .populate("clsSubject", "subCode")
    .populate("clsTeacher", "techName");
  res.status(200).json(classes);
};
exports.deleteClass = async (req, res) => {
  await ClassModel.findByIdAndDelete(req.params.id);
  res.status(200).send("Class removed..");
};
exports.getClsForStudent = async (req, res) => {
  const { deptId, sem } = req.params;
  const classes = await ClassModel.find({ clsDept: deptId, clsSemester: sem })
    .populate("clsSubject", "subCode")
    .populate("clsTeacher", "techName");
  res.status(200).json(classes);
};
exports.specificClass = async (req, res) => {
  const specificClassData = await ClassModel.findById(req.params.id)
    .populate("clsSubject", "subName")
    .populate("clsTeacher", "techName");
  res.status(200).send(specificClassData);
};

exports.updateClass = async (req, res) => {
  await ClassModel.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).send("Class updated");
};

exports.addMaterial = async (req, res) => {
  const { clsCode, type, materialName } = req.body;

  const prevClsState = await ClassModel.findById(clsCode);

  if (type === "link") {
    await ClassModel.findByIdAndUpdate(clsCode, {
      clsMaterials: [
        ...prevClsState.clsMaterials,
        { materialName, material: req.body.material, type },
      ],
    });
  }
  if (type === "file") {
    const { path: material } = req.file;
    await ClassModel.findByIdAndUpdate(clsCode, {
      clsMaterials: [
        ...prevClsState.clsMaterials,
        { materialName, material, type },
      ],
    });
  }
  res.json({ message: "success" });
};

exports.deleteMaterial = async (req, res) => {
  const { clsCode, materialId } = req.params;
  const cls = await ClassModel.findById(clsCode).select("clsMaterials");
  let { clsMaterials } = cls;

  let index = clsMaterials.findIndex((c) => c._id.toString() === materialId);
  let removedObj = clsMaterials.splice(index, 1);
  if (removedObj[0].type === "file") {
    const deleteFile = path.join(__dirname, `../${removedObj[0].material}`);
    try {
      fs.unlinkSync(deleteFile);
    } catch (error) {}
  }
  await ClassModel.findByIdAndUpdate(clsCode, {
    clsMaterials: [...clsMaterials],
  });
};
