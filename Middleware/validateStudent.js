const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const Student = require("../Model/studentModel");

const schema = Joi.object({
  studentRoll: Joi.string().required().label("Student Roll"),
  studentName: Joi.string().required().label("Student Name"),
  studentDept: Joi.objectId().required().label("Student Department"),
  studentSemester: Joi.string().required().label("Student Semester"),
  studentEmail: Joi.string().required().label("Student Email"),
  studentPhone: Joi.string().min(10).max(10).required().label("Student Phone"),
  studentPassword: Joi.string().required().label("Student Password"),
});

const validateAddStudent = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.json(error.details[0]);

  let existing = await Student.findOne({ studentRoll: req.body.studentRoll });
  if (existing) return res.json({ message: "Roll.No already exist!" });
  existing = await Student.findOne({ studentEmail: req.body.studentEmail });
  if (existing) return res.json({ message: "Email already exist!" });
  next();
};

const validateUpdateStudent = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.json(error.details[0]);

  const currentStudent = await Student.findById(req.params.id);

  let existing = await Student.findOne({ studentRoll: req.body.studentRoll });
  if (existing && existing.studentRoll !== currentStudent.studentRoll)
    return res.json({ message: "Roll already exist!" });

  existing = await Student.findOne({ studentEmail: req.body.studentEmail });
  if (existing && existing.studentEmail !== currentStudent.studentEmail)
    return res.json({ message: "Email already exist" });

  next();
};

module.exports = { validateAddStudent, validateUpdateStudent };
