const _ = require("lodash");

exports.genAttendReport = (attendanceData, studentData) => {
  let attendReport = [];
  studentData.forEach(findOneStudent);
  function findOneStudent(student) {
    let oneStudent = _.filter(attendanceData, { studentId: student._id });
    oneStudent = _.map(
      oneStudent,
      _.partialRight(_.pick, [
        "_id",
        "totalCls",
        "attendedCls",
        "studentId",
        "semester",
      ])
    );
    let totalCls = _.sumBy(oneStudent, "totalCls");
    let attendedCls = _.sumBy(oneStudent, "attendedCls");
    let percentage = isNaN(((attendedCls / totalCls) * 100).toFixed(2))
      ? 0
      : ((attendedCls / totalCls) * 100).toFixed(2);
    let finalRes = {
      student: _.find(studentData, function (std) {
        return std._id === student._id;
      }),
      attended: attendedCls,
      total: totalCls,
      percentage,
    };
    attendReport.push(finalRes);
  }
  return attendReport;
};
