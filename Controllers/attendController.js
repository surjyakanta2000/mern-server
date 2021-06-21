const AttendModel = require("../Model/attendModel");

exports.addAttend = async (req, res) => {
  const { clsCode, student, clsDate, status } = req.body;
  const dataExist = await AttendModel.findOne({
    studentId: student,
    clsCode: clsCode,
  });
  if (!dataExist) {
    const data = await AttendModel.create({
      studentId: student,
      clsCode: clsCode,
      totalCls: 1,
      attendedCls: status == "p" ? 1 : 0,
      classTakenDate: clsDate,
    });
    return res.json(data);
  }
  if (dataExist) {
    if (dataExist.classTakenDate !== clsDate) {
      await AttendModel.findByIdAndUpdate(dataExist._id, {
        studentId: student,
        clsCode: clsCode,
        totalCls: dataExist.totalCls + 1,
        attendedCls:
          status == "p" ? dataExist.attendedCls + 1 : dataExist.attendedCls,
        classTakenDate: clsDate,
      });
    }
  }
};

exports.getAttend = async (req, res) => {
  const { id } = req.params;
  const attendList = await AttendModel.find({ studentId: id }).populate(
    "clsCode"
  );
  res.status(200).send(attendList);
};
