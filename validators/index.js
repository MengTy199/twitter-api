const { checkSchema } = require("express-validator")

const createUserValidator = checkSchema({
    email: {
        isEmail: true,
        trim: true
    },
    username: {
        notEmpty: true,
        isLength: {
            options: {
                max: 10,
            },
            errorMessage: 'Only max 10 characters allowed'
        },
        trim: true
    }
})

module.exports = { createUserValidator }