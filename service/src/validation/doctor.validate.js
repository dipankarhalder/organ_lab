const Joi = require('joi');
const { valid } = require('../utils');

const doctorSchema = Joi.object({
  fullName: valid.requiredString('Full name is required'),
  email: valid.email,
  phone: valid.phone,
  experience: Joi.number().min(0).required().messages({
    'number.base': 'Experience is required',
  }),
  location: Joi.string().required().messages({
    'string.empty': 'Location is required',
  }),
  specialization: Joi.string().required().messages({
    'string.empty': 'Specialization is required',
  }),
  qualifications: Joi.array().items(Joi.string()).optional(),
  bio: Joi.string().optional(),
});

const doctorUpdateSchema = Joi.object({
  fullName: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().min(10).optional(),
  specialization: Joi.string().optional(),
  experience: Joi.number().min(0).optional(),
  qualifications: Joi.array().items(Joi.string()).optional(),
  bio: Joi.string().optional(),
  location: Joi.string().optional(),
});

const labDoctorSchema = Joi.object({
  fullName: valid.requiredString('Full name is required'),
  email: valid.email,
  phone: valid.phone,
  experience: Joi.number().min(0).required().messages({
    'number.base': 'Experience is required',
  }),
  location: Joi.string().required().messages({
    'string.empty': 'Location is required',
  }),
  specialization: Joi.string().required().messages({
    'string.empty': 'Specialization is required',
  }),
  qualifications: Joi.array().items(Joi.string()).optional(),
  bio: Joi.string().optional(),
});

module.exports = {
  doctorSchema,
  doctorUpdateSchema,
  labDoctorSchema,
};
