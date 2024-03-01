const { User: UserType } = require('../types');
const User = require('../models/user');

exports.getUser = (query: Partial<typeof UserType>) => {
    return User.findOne(query)
        .then((user: typeof UserType) => {
            if (user) {
                return user
            } else return user
        })
        .catch((err: any) => { throw err })
}

exports.createUser = (query: Partial<typeof UserType>) => {
    return User.create(query)
        .then((user: typeof UserType) => {
            if (!user) throw ({ message: 'Error creating user!' });
            else {
                user.encry_password = undefined;
                user.salt = undefined;
                return user
            }
        })
        .catch((err: any) => { throw err })
}