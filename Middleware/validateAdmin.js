const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const Admin = require("../Model/adminModel");

const schema = Joi.object({
  adminName: Joi.string().required().label("adminName"),
  adminEmail: Joi.string().required().label("adminEmail"),
  adminPhone: Joi.string().required().label("adminPhone"),
  adminPassword: Joi.string().required().label("adminPassword"),
});

const validateAddAdmin = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.send(error.details[0].message);

  let existing = await Admin.findOne({ adminEmail: req.body.adminEmail });
  if (existing) return res.status(400).send("Email already exist..");

  existing = await Admin.findOne({ adminPhone: req.body.adminPhone });
  if (existing) return res.status(400).send("Phone already exist..");
  next();
};

const validateUpdateAdmin = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.send(error.details[0].message);

  const currentAdmin = await Admin.findById(req.params.id);

  let existing = await Admin.findOne({ adminEmail: req.body.adminEmail });
  if (existing && existing.adminEmail !== currentAdmin.adminEmail)
    return res.status(400).send("Email already exist..");

  existing = await Admin.findOne({ adminPhone: req.body.adminPhone });
  if (existing && existing.adminPhone !== currentAdmin.adminPhone)
    return res.status(400).send("Phone already exist..");

  next();
};

module.exports = { validateAddAdmin, validateUpdateAdmin };
