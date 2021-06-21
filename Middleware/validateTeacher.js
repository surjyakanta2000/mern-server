const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const Teacher = require("../Model/techModel");

const schema = Joi.object({
  techName: Joi.string().required().label("techName"),
  techDept: Joi.objectId().required().label("techDept"),
  techEmail: Joi.string().required().label("techName"),
  techPhone: Joi.string().required().label("techName"),
  techPassword: Joi.string().required().label("techPassword"),
  role: Joi.string().label("role"),
});

const validateAddTeach = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.send(error.details[0].message);

  let existing = await Teacher.findOne({ techEmail: req.body.techEmail });
  if (existing) return res.status(400).send("Email already exist..");

  existing = await Teacher.findOne({ techPhone: req.body.techPhone });
  if (existing) return res.status(400).send("Phone already exist..");
  next();
};

const validateUpdateTeach = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.send(error.details[0].message);

  const currentTeacher = await Teacher.findById(req.params.id);

  let existing = await Teacher.findOne({ techEmail: req.body.techEmail });
  if (existing && existing.techEmail !== currentTeacher.techEmail)
    return res.status(400).send("Email already exist..");

  existing = await Teacher.findOne({ techPhone: req.body.techPhone });
  if (existing && existing.techPhone !== currentTeacher.techPhone)
    return res.status(400).send("Phone already exist..");
  next();
};

module.exports = { validateAddTeach, validateUpdateTeach };
