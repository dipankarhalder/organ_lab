const Joi = require('joi');
const { valid } = require('../utils');
const { role } = require('../constant');

const emergencyContactSchema = Joi.object({
  name: valid.requiredString('Emergency contact name is required'),
  phone: valid.phone,
  relation: valid.requiredString('Relation is required'),
});

const patientSchema = Joi.object({
  firstName: valid.requiredString('First name is required'),
  lastName: valid.requiredString('Last name is required'),
  email: valid.email,
  phone: valid.phone,
  gender: Joi.string()
    .valid(role.genderInfo.MALE, role.genderInfo.FEMALE, role.genderInfo.OTHER)
    .required()
    .messages({
      'any.only': `Gender must be one of ${Object.values(role.genderInfo).join(', ')}`,
      'string.empty': 'Gender is required',
    }),
  dateOfBirth: Joi.date().iso().required().messages({
    'date.base': 'Date of Birth must be a valid date',
    'any.required': 'Date of Birth is required',
  }),
  address: Joi.string().allow('', null),
  emergencyContact: Joi.array().items(emergencyContactSchema).optional(),
}).options({ stripUnknown: true });

module.exports = {
  patientSchema,
};
