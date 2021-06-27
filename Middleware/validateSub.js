const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const Subject = require("../Model/subModel");

const schema = Joi.object({
  subCode: Joi.string().required().label("Subject Code"),
  subName: Joi.string().required().label("Subject Name"),
  subDept: Joi.objectId().required().label("Subject Deparment"),
  subSemester: Joi.string().required().label("Semester"),
});

const validateAddSub = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.json(error.details[0]);

  let existing = await Subject.findOne({ subCode: req.body.subCode });
  if (existing) return res.json({ message: "Code already exist!" });

  next();
};

const validateUpdateSub = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.json(error.details[0]);

  const currentSubject = await Subject.findById(req.params.id);

  let existing = await Subject.findOne({ subCode: req.body.subCode });
  if (existing && existing.subCode !== currentSubject.subCode)
    return res.json({ message: "Code already exist!" });

  next();
};

module.exports = { validateAddSub, validateUpdateSub };
