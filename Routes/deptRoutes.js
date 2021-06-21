const express = require('express');
const deptRouter = express.Router();
const {validateAddDept,validateUpdateDept} = require('../Middleware/validateDept');
const joiValidate  = require('../Middleware/validateID');
const deptController = require('../Controllers/deptController');

deptRouter.post('/add',validateAddDept,deptController.addDept);
deptRouter.get('/all',deptController.allDept);
deptRouter.get('/:id',joiValidate,deptController.specificDept);
deptRouter.delete('/delete/:id',joiValidate,deptController.deleteDept);
deptRouter.put('/update/:id',joiValidate,validateUpdateDept,deptController.updateDept);


module.exports = deptRouter;