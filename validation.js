const Joi = require("joi");

const registerValidaton = (data) => {
  const joiSchema = Joi.object({
    name: Joi.string().required().min(6),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
  });
  return joiSchema.validate(data);
};
const loginValidaton = (data) => {
  const joiSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
  });
  return joiSchema.validate(data);
};

module.exports = { registerValidaton, loginValidaton };
