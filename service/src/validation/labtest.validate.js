const Joi = require('joi');
const { valid } = require('../utils');

const labChargeSchema = Joi.object({
  location: valid.requiredString('Location is required'),
  price: Joi.number().required().messages({
    'any.required': 'Price is required',
    'number.base': 'Price must be a number',
  }),
});

const labTestSchema = Joi.object({
  testCode: valid.requiredString('Test code is required'),
  testName: valid.requiredString('Test name is required'),
  commission: Joi.string().allow('', null),
  reportDay: Joi.string().allow('', null),
  labCharge: Joi.array().items(labChargeSchema).optional().messages({
    'array.base': 'Lab charges must be an array',
  }),
  isActive: Joi.boolean().optional(),
}).options({ stripUnknown: true });

module.exports = {
  labTestSchema,
};
