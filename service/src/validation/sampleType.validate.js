const Joi = require('joi');
const { valid } = require('../utils');

const sampleTypeSchema = Joi.object({
  typeName: valid.requiredString('Type name should not be blank.'),
  typeDesc: valid.requiredString('Type description should not be blank.'),
});

module.exports = {
  sampleTypeSchema,
};
