const Joi = require('joi');

const {constants, userRoles} = require('../configs');

const createUserValidator = Joi.object({
    username: Joi
        .string()
        .min(5)
        .max(30)
        .trim()
        .required(),
    first_name: Joi
        .string()
        .min(2)
        .max(30)
        .trim()
        .required(),
    last_name: Joi
        .string()
        .min(2)
        .max(30)
        .trim()
        .required(),
    email: Joi
        .string()
        .regex(constants.EMAIL_REGEXP)
        .lowercase()
        .required(),
    password: Joi
        .string()
        .regex(constants.PASSWORD_REGEXP)
        .min(8)
        .max(128)
        .trim()
        .required(),
    role: Joi
        .string()
        .allow(...Object.values(userRoles)),
});

const updateUserValidator = Joi.object({
    username: Joi
        .string()
        .min(5)
        .max(30)
        .trim(),
    first_name: Joi
        .string()
        .min(2)
        .max(30)
        .trim(),
    last_name: Joi
        .string()
        .min(2)
        .max(30)
        .trim(),
    email: Joi
        .string()
        .regex(constants.EMAIL_REGEXP)
        .lowercase(),
    password: Joi
        .string()
        .regex(constants.PASSWORD_REGEXP)
        .min(8)
        .max(128)
        .trim(),
    role: Joi
        .string()
        .allow(...Object.values(userRoles)),
});

module.exports = {
    createUserValidator,
    updateUserValidator
};

