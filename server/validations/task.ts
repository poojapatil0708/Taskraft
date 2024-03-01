const Joi = require('joi');
const { validateRequest } = require('./validate-request');
const { Request, Response, NextFunction } = require('express');

exports.createTaskSchema = (req: typeof Request, res: typeof Response, next: typeof NextFunction) => {
    const schema = Joi.object({
        user: Joi.string().required(),
        title: Joi.string().min(3).max(100).required(),
        description: Joi.string().min(3).max(100).optional(),
        status: Joi.string().valid('pending', 'progress', 'completed').required(),
    })
    validateRequest(req, res, next, schema);
}

exports.updateTaskSchema = (req: typeof Request, res: typeof Response, next: typeof NextFunction) => {
    const schema = Joi.object({
        user: Joi.string().required(),
        title: Joi.string().min(3).max(100).required(),
        description: Joi.string().min(3).max(100).optional(),
        status: Joi.string().valid('pending', 'progress', 'completed').required(),
    })
    validateRequest(req, res, next, schema);
}

export {};