const Joi = require('joi');
const { valid } = require('../utils');

const categoryInfoSchema = Joi.object({
  name: valid.requiredString('Name should not be blank.'),
  description: valid.requiredString('Description should not be blank.'),
});

module.exports = {
  categoryInfoSchema,
};
