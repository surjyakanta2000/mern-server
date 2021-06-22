require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.genJwt = (user) => {
  const payload = { _id: user._id, role: user.role };
  if (user.role === "admin") {
    (payload.name = user.adminName), (payload.email = user.adminEmail);
  }
  if (user.role === "student") {
    (payload.name = user.studentName), (payload.email = user.studentEmail);
  }
  if (user.role === "teacher" || user.role === "hod") {
    (payload.name = user.techName),
      (payload.email = user.techEmail),
      (payload.deptName = user.techDept.deptName),
      (payload.deptId = user.techDept._id);
  }

  const token = jwt.sign(payload, process.env.TOKEN_KEY);
  return token;
};
