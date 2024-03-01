const { Request, Response, NextFunction } = require('express');

exports.validateRequest = (req: typeof Request, res: typeof Response, next: typeof NextFunction, schema: any) => {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        res.status(400).send({ message: `Validation error: ${error.details.map((x: any) => x.message).join(', ')}` })
    } else {
        req.body = value;
        next();
    }
}

export { };