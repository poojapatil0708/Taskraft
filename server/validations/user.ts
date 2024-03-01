const Joi = require('joi');
const { validateRequest } = require('./validate-request');
const { Request, Response, NextFunction } = require('express');

exports.createAccountSchema = (req: typeof Request, res: typeof Response, next: typeof NextFunction) => {

    const schema = Joi.object({
        first_name: Joi.string().min(3).max(100).required(),
        last_name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
    validateRequest(req, res, next, schema);
}

exports.loginSchema = (req: typeof Request, res: typeof Response, next: typeof NextFunction) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        device_token: Joi.string().optional(),
    })
    validateRequest(req, res, next, schema);
}

export { };