const Joi = require("joi");
const bcrypt = require("bcryptjs");
const Student = require("../Model/studentModel");
const Teacher = require("../Model/techModel");
const Admin = require("../Model/adminModel");
const { genJwt } = require("../utils/generateToken");

const schema = Joi.object({
  email: Joi.string().required().label("Email"),
  password: Joi.string().required().label("Password"),
  role: Joi.string().required().label("Role"),
});

const resetSchema = Joi.object({
  email: Joi.string().required().label("Email"),
  role: Joi.string().required().label("Role"),
});

const passSchema = Joi.object({
  password: Joi.string().min(5).required().label("Password"),
  cpassword: Joi.string().min(5).required().label("Confirm Password"),
  role: Joi.string().required().label("Role"),
});

exports.userLogin = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.json(error.details[0]);

  const { email, password, role } = req.body;
  if (role === "student") {
    const studentData = await Student.findOne({
      studentEmail: email,
    });
    if (!studentData) return res.json({ message: "Invalid email or password" });
    bcrypt.compare(studentData.studentPassword, password).then(() => {
      const token = genJwt(studentData);
      res
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send({ message: "success" });
    });
  }
  if (role === "teacher" || role === "hod") {
    const teacherData = await Teacher.findOne({
      techEmail: email,
    }).populate("techDept", "deptName");
    if (!teacherData) return res.json({ message: "Invalid email or password" });
    bcrypt.compare(teacherData.techPassword, password).then(() => {
      const token = genJwt(teacherData);
      res
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send({ message: "success" });
    });
  }

  if (role === "admin") {
    const adminData = await Admin.findOne({
      adminEmail: email,
    });
    if (!adminData) return res.json({ message: "Invalid email.." });
    bcrypt.compare(adminData.adminPassword, password).then(() => {
      const token = genJwt(adminData);
      res
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send({ message: "success" });
    });
  }
};

exports.userCheck = async (req, res) => {
  const { error } = resetSchema.validate(req.body);
  if (error) return res.json(error.details[0]);
  const { email, role } = req.body;

  if (role === "teacher" || role === "hod") {
    let user = await Teacher.findOne({ techEmail: email });
    if (!user) return res.json({ message: "Invalid Email or Role" });
    return res.json({
      _id: user._id,
      email: user.techEmail,
      securityQuestion: user.securityQuestion,
      role: user.role,
    });
  }
  if (role === "student") {
    user = await Student.findOne({ studentEmail: email });
    if (!user) return res.json({ message: "Invalid Email or Role" });
    return res.json({
      _id: user._id,
      email: user.techEmail,
      securityQuestion: user.securityQuestion,
    });
  }
};

exports.ansCheck = async (req, res) => {
  const { email, securityAnswer, role } = req.body;
  if (securityAnswer === "" || securityAnswer === undefined)
    return res.json({
      message: '"Secuiry Answer" is not allowed to be empty',
    });

  if (role === "teacher" || role === "hod") {
    const user = await Teacher.findOne({
      techEmail: email,
      securityAnswer: securityAnswer,
    });
    if (!user) return res.json({ message: "Incorrect Answer!" });
    return res.json({ _id: user._id, message: "success" });
  }
  if (role === "student") {
    const user = await Student.findOne({
      studentEmail: email,
      securityAnswer: securityAnswer,
    });
    if (!user) return res.json({ message: "Incorrect Answer!" });
    return res.json({ _id: user._id, message: "success" });
  }
};

exports.resetPassword = async (req, res) => {
  const { error } = passSchema.validate(req.body);
  if (error) return res.json(error.details[0]);

  const { password, cpassword, role } = req.body;
  const { id } = req.params;
  if (password !== cpassword)
    return res.json({ message: "Password Not Matched!" });

  if (role === "student") {
    await Student.findByIdAndUpdate(id, { studentPassword: password });
  }
  if (role === "teacher" || role === "hod") {
    await Teacher.findByIdAndUpdate(id, { techPassword: password });
  }
  res.json({ message: "success" });
};
