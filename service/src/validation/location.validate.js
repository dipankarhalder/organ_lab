const Joi = require('joi');
const { valid } = require('../utils');

const locationSchema = Joi.object({
  locationName: valid.requiredString('Location name is required.'),
  locationCode: valid.requiredString('Location code is required.'),
  locationAddress: valid.requiredString('Location address is required.'),
  locationPincode: Joi.string().allow('', null),
});

module.exports = {
  locationSchema,
};
