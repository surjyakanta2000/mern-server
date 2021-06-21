const joi = require('joi');
const validateId = require('./validateID');
const Department = require ('../Model/deptModel');

const schema = joi.object({
    deptCode : joi.string().required().label('deptCode'),
    deptName : joi.string().required().label('deptName')
})

const validateAddDept  = async(req,res,next)=>{
    const {error} = schema.validate(req.body);
    if(error)
        return res.send(error.details[0].message);

    let existing = await Department.findOne({deptCode:req.body.deptCode});
    if(existing)
        return res.status(400).send('Department Code already exist..');

    existing = await Department.findOne({deptName:req.body.deptName});
    if(existing)
        return res.status(400).send('Department Name already exist..');
    next();
}

const validateUpdateDept =  async (req,res,next)=>{
    const {error} = schema.validate(req.body);
    if(error)
        return res.send(error.details[0].message);
    const currentDept = await Department.findById(req.params.id);
    let existingDept = await Department.findOne({deptCode:req.body.deptCode});
    if(existingDept && currentDept.deptCode !== req.body.deptCode)
        return res.status(400).send('Department Code already exist..');
    existingDept = await Department.findOne({deptName:req.body.deptName});
    if(existingDept && currentDept.deptName !== req.body.deptName)
        return res.status(400).send('Department Name already exist..');

    next();
}

module.exports = {validateAddDept,validateUpdateDept};