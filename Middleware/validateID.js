const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
 
const schema = Joi.object({
  id: Joi.objectId()
})
const validateId = async(req,res,next)=>{

    const {error} = schema.validate(req.params);
    if(error)
        return res.status(400).send(error.details[0].message);
    next();
}

module.exports = validateId;