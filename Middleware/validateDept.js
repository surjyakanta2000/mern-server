const joi = require("joi");
const validateId = require("./validateID");
const Department = require("../Model/deptModel");

const schema = joi.object({
  deptCode: joi.string().required().label("Department Code"),
  deptName: joi.string().required().label("Department Name"),
});

const validateAddDept = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.json(error.details[0]);

  let existing = await Department.findOne({ deptCode: req.body.deptCode });
  if (existing) return res.json({ message: "Department Code already exist!" });

  existing = await Department.findOne({ deptName: req.body.deptName });
  if (existing) return res.json({ message: "Department Name already exist!" });
  next();
};

const validateUpdateDept = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.json(error.details[0]);

  const currentDept = await Department.findById(req.params.id);
  let existingDept = await Department.findOne({ deptCode: req.body.deptCode });
  if (existingDept && currentDept.deptCode !== req.body.deptCode)
    return res.json({ message: "Department Code aleady in use!!" });
  existingDept = await Department.findOne({ deptName: req.body.deptName });
  if (existingDept && currentDept.deptName !== req.body.deptName)
    return res.json({ message: "Department Name already in use!" });

  next();
};

module.exports = { validateAddDept, validateUpdateDept };
