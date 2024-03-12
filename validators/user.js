const { checkSchema } = require("express-validator")
const { userModel } = require("../models/user.js")

const createUserValidator = checkSchema({
    username: {
        notEmpty: true,
        isLength: {
            options: {
                max: 20,
                min: 3
            },
            errorMessage: "Username's length must be 20 characters maximum and 3 characters minimum."
        },
        custom:{
            options: async value =>{
                const user = await userModel.find({
                    username : value
                })
                if(user.length !=0){
                    throw new Error("Name already registered")
                }
            }
        }
    },
    email: {
        isEmail: true,
        errorMessage: "Invalid email address",
        custom: {
            options: async value => {
                const user = await userModel.find({
                    email: value
                })
                if (user.length != 0) {
                    throw new Error("Email already registered")
                }
            }
        }
    },
    password: {
        notEmpty: true
    }
})

module.exports = { createUserValidator }
