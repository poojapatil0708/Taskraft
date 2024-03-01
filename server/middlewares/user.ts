const jwt = require('jsonwebtoken');
const { Request, Response, NextFunction } = require('express');

exports.isAuthorized = (req: typeof Request, res: typeof Response, next: typeof NextFunction) => {
    const bearer = req.headers['authorization']
    if (bearer) {
        jwt.verify(bearer.split(' ')[1], 'ABDVDNILLKKJIIJJKJDGFJBF', (err: any, decoded: any) => {
            if (err) return res.status(401).send({ message: 'Authorization token is expired or invalid' });
            else {
                req.user_id = decoded.id;
                next();
            }
        })
    } else return res.status(401).send({ message: 'No authorization token was found' });
};

export { };