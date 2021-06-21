const mongoose = require('mongoose');
const DeptSchema = mongoose.Schema({
    deptCode:{
        type:String,
        required:true,
        uppercase:true,
        unique:true,
        trim:true
    },
    deptName:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
});
const Department = mongoose.model('Department',DeptSchema);
module.exports=Department;