const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const Student = require("../Model/studentModel");

const schema = Joi.object({
  studentRoll: Joi.string().required().label("studentRoll"),
  studentName: Joi.string().required().label("studentName"),
  studentDept: Joi.objectId().required().label("studentDept"),
  studentSemester: Joi.string().required().label("studentSemester"),
  studentEmail: Joi.string().required().label("studentEmail"),
  studentPhone: Joi.string().required().label("studentPhone"),
  studentPassword: Joi.string().required().label("studentPassword"),
});

const validateAddStudent = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.send(error.details[0].message);

  let existing = await Student.findOne({ studentRoll: req.body.studentRoll });
  if (existing) return res.status(400).send("Roll.No already exist..");
  existing = await Student.findOne({ studentEmail: req.body.studentEmail });
  if (existing) return res.status(400).send("Email already exist..");
  next();
};

const validateUpdateStudent = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.send(error.details[0].message);

  const currentStudent = await Student.findById(req.params.id);

  let existing = await Student.findOne({ studentRoll: req.body.studentRoll });
  if (existing && existing.studentRoll !== currentStudent.studentRoll)
    return res.status(400).send("Roll already exist..");

  existing = await Student.findOne({ studentEmail: req.body.studentEmail });
  if (existing && existing.studentEmail !== currentStudent.studentEmail)
    return res.status(400).send("Email already exist..");

  next();
};

module.exports = { validateAddStudent, validateUpdateStudent };
