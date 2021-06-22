const Joi = require("joi");
const Student = require("../Model/studentModel");
const Teacher = require("../Model/techModel");
const Admin = require("../Model/adminModel");
const { genJwt } = require("../utils/generateToken");

const schema = Joi.object({
  email: Joi.string().required().label("email"),
  password: Joi.string().required().label("password"),
  role: Joi.string().required().label("role"),
});

exports.userLogin = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.send(error.details[0].message);
  const { email, password, role } = req.body;
  if (role === "student") {
    const studentData = await Student.findOne({
      studentEmail: email,
      studentPassword: password,
    }).select("-studentPassword");
    if (!studentData) return res.status(404).send("invalid email or password");
    const token = genJwt(studentData);
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({ message: "success" });
  }
  if (role === "teacher" || role === "hod") {
    const teacherData = await Teacher.findOne({
      techEmail: email,
      techPassword: password,
    })
      .populate("techDept", "deptName")
      .select("-techPassword");
    if (!teacherData) return res.status(404).send("invalid email or password");
    const token = genJwt(teacherData);
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({ message: "success" });
  }
  if (role === "admin") {
    const adminData = await Admin.findOne({
      adminEmail: email,
      adminPassword: password,
    }).select("-adminPassword");
    if (!adminData) return res.status(404).send("invalid email or password");
    const token = genJwt(adminData);
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({ message: "success" });
  }
};
