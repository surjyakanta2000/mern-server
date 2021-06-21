const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const ClassModel = require("../Model/classModel");

const schema = Joi.object({
  clsName: Joi.string().required().label("clsName"),
  clsDept: Joi.objectId().required().label("clsDept"),
  clsSubject: Joi.objectId().required().label("clsSubject"),
  clsTeacher: Joi.objectId().required().label("clsTeacher"),
  clsSemester: Joi.string().required().label("clsSemester"),
});

const validateAddClass = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.send(error.details[0].message);
  next();
};

const validateUpdateClass = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.send(error.details[0].message);

  next();
};

module.exports = { validateAddClass, validateUpdateClass };
