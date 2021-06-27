const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const Teacher = require("../Model/techModel");

const schema = Joi.object({
  techName: Joi.string().required().label("Name"),
  techDept: Joi.objectId().required().label("Department"),
  techEmail: Joi.string().required().label("Email"),
  techPhone: Joi.string().required().label("Phone"),
  techPassword: Joi.string().required().label("Password"),
  role: Joi.string().label("Role"),
});

const validateAddTeach = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.json(error.details[0]);

  let existing = await Teacher.findOne({ techEmail: req.body.techEmail });
  if (existing) return res.json({ message: "Email already exist!" });

  existing = await Teacher.findOne({ techPhone: req.body.techPhone });
  if (existing) return res.json({ message: "Phone already exist!" });
  next();
};

const validateUpdateTeach = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.json(error.details[0]);

  const currentTeacher = await Teacher.findById(req.params.id);

  let existing = await Teacher.findOne({ techEmail: req.body.techEmail });
  if (existing && existing.techEmail !== currentTeacher.techEmail)
    return res.json({ message: "Email already exist!" });

  existing = await Teacher.findOne({ techPhone: req.body.techPhone });
  if (existing && existing.techPhone !== currentTeacher.techPhone)
    return res.json({ message: "Phone already exist!" });

  if (req.body.role === "hod") {
    existing = await Teacher.findOne({
      techDept: req.body.techDept,
      role: req.body.role,
    });
    if (existing && existing.techEmail !== currentTeacher.techEmail)
      return res.json({
        message: "Already one HOD exist for this department!",
      });
  }

  next();
};

module.exports = { validateAddTeach, validateUpdateTeach };
