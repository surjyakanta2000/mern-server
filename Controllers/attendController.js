const AttendModel = require("../Model/attendModel");
const AttendDateWise = require("../Model/attendDateWise");
const Student = require("../Model/studentModel");
const _ = require("lodash");
const { genAttendReport } = require("../utils/generateAttendReport");

exports.addAttend = async (req, res) => {
  const {
    clsCode,
    student,
    clsDate,
    status,
    department,
    semester,
    studentRoll,
    studentName,
  } = req.body;

  const result = await AttendDateWise.findOne({
    clsCode: clsCode,
    clsDate: clsDate,
  });
  if (!result) {
    await AttendDateWise.create({
      clsCode,
      clsDate,
      data: [
        {
          studentRoll,
          studentName,
          status,
        },
      ],
    });
  } else {
    const { data } = result;
    const index = data.findIndex((d) => d.studentRoll === studentRoll);
    if (index !== -1) {
      data[index].status = status;
    } else {
      data.push({
        studentRoll,
        studentName,
        status,
      });
    }

    await AttendDateWise.findByIdAndUpdate(result._id, {
      data: [...data],
    });
  }

  const dataExist = await AttendModel.findOne({
    studentId: student,
    clsCode: clsCode,
    department,
    semester,
  });
  if (!dataExist) {
    const data = await AttendModel.create({
      studentId: student,
      clsCode: clsCode,
      department,
      semester,
      totalCls: 1,
      attendedCls: status == "p" ? 1 : 0,
      classTakenDate: clsDate,
      lastStatus: status,
    });
    return res.json(data);
  }
  if (dataExist) {
    if (dataExist.classTakenDate !== clsDate) {
      await AttendModel.findByIdAndUpdate(dataExist._id, {
        studentId: student,
        clsCode: clsCode,
        department,
        semester,
        totalCls: dataExist.totalCls + 1,
        attendedCls:
          status == "p" ? dataExist.attendedCls + 1 : dataExist.attendedCls,
        classTakenDate: clsDate,
        lastStatus: status,
      });
    }
    if (dataExist.classTakenDate === clsDate) {
      await AttendModel.findByIdAndUpdate(dataExist._id, {
        studentId: student,
        clsCode: clsCode,
        department,
        semester,
        totalCls: dataExist.totalCls,
        attendedCls:
          status === dataExist.lastStatus
            ? dataExist.attendedCls
            : status === "p"
            ? dataExist.attendedCls + 1
            : dataExist.attendedCls - 1,
        classTakenDate: clsDate,
        lastStatus: status,
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

exports.getAttendForDept = async (req, res) => {
  const { id } = req.params;
  const data = await AttendModel.find({ department: id });
  const students = await Student.find({ studentDept: id }).select(
    "_id studentRoll studentName studentSemester"
  );

  const result = genAttendReport(data, students);

  res.status(200).json(result);
};

exports.getGetAttendDateWise = async (req, res) => {
  const { id } = req.params;
  const data = await AttendDateWise.find({ clsCode: id });
  return res.json(data);
};
