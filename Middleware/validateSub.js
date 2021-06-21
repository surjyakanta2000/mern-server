const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const Subject = require("../Model/subModel");

const schema = Joi.object({
  subCode: Joi.string().required().label("subCode"),
  subName: Joi.string().required().label("subName"),
  subDept: Joi.objectId().required().label("subDept"),
  subSemester: Joi.string().required().label("subSemester"),
});

const validateAddSub = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.send(error.details[0].message);

  let existing = await Subject.findOne({ subCode: req.body.subCode });
  if (existing) return res.status(400).send("Code already exist..");

  next();
};

const validateUpdateSub = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.send(error.details[0].message);

  const currentSubject = await Subject.findById(req.params.id);

  let existing = await Subject.findOne({ subCode: req.body.subCode });
  if (existing && existing.subCode !== currentSubject.subCode)
    return res.status(400).send("Code already exist..");

  next();
};

module.exports = { validateAddSub, validateUpdateSub };
