/* eslint-disable @typescript-eslint/no-var-requires */
const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');

const Joi = BaseJoi.extend(Extension);
const ClassStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};
const validSchema = Joi.object().keys({
  name: Joi.string().max(255).required(),
  description: Joi.string().max(255).allow('').allow(null),
  status: Joi.string().valid(ClassStatus.ACTIVE, ClassStatus.INACTIVE).required(),
});

function createValidator(data) {
  const result = Joi.array().items(validSchema).min(1).validate(data);
  if (result.error) {
    return {
      success: false,
      message: result.error.message,
      error: result.error.details,
    };
  }
  return {
    success: true,
    message: 'Success',
  };
}

module.exports = {
  createValidator,
};
