const jwt = require("jsonwebtoken");
const { User } = require('../types');
const { Request, Response } = require('express');
const { getUser, createUser } = require('../services/user');

exports.signup = (req: typeof Request, res: typeof Response) => {
    getUser({ email: req.body.email })
        .then((user: typeof User) => {
            if (!user) { return createUser(req.body) }
            else throw ({ message: 'Account already exist with this email' });
        })
        .then((newuser: typeof User) => {
            let token = jwt.sign({ id: newuser._id }, 'ABDVDNILLKKJIIJJKJDGFJBF');
            return res.status(200).send({ message: 'Account Created Successfully!', user: newuser, token })
        })
        .catch((err: any) => res.status(400).send(err))
}

exports.login = (req: typeof Request, res: typeof Response) => {
    getUser({ email: req.body.email })
        .then((user: typeof User) => {
            if (user) {
                if (user.authenticate(req.body.password)) {
                    user.salt = undefined;
                    user.encry_password = undefined;
                    let token = jwt.sign({ id: user._id }, 'ABDVDNILLKKJIIJJKJDGFJBF');
                    return res.status(200).send({ message: 'Login Successful!', user: user, token })
                }
                else throw ({ status: 400, message: 'Invalid email or password' });
            } else return res.status(404).send({ message: 'User not found' })
        })
        .catch((err: any) => res.status(err.status || 400).send({ message: err.message || 'Error logging in', err }));
}

export { };