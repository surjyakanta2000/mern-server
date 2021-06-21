const Department = require('../Model/deptModel');

exports.addDept = async(req,res) =>{
    
    const {deptCode,deptName} = req.body;
    const deptData = await Department.create({deptCode,deptName});    
    res.status(200).json(deptData);
}

exports.allDept = async(req,res)=>{
    const allDeptData = await Department.find({});
    res.status(200).json(allDeptData);
}

exports.specificDept = async(req,res)=>{
    const specificDeptData = await Department.findById(req.params.id);
    res.status(200).send(specificDeptData);
}

exports.updateDept = async(req,res)=>{
    const updateDeptData = await Department.findByIdAndUpdate(req.params.id,req.body);
    res.send('Update Successfull..');
}

exports.deleteDept = async(req,res)=>{
    const deleteDeptData = await Department.findByIdAndDelete(req.params.id);
    if(deleteDeptData)
        return res.status(200).json(deleteDeptData);
    else
        return res.status(404).send('no data found..');
}