const { checkSchema } = require("express-validator");
const { userModel } = require("../models/user.js");
const {checkIfEmailExist} = require("../common/index.js")
const createUserValidator = checkSchema({
  username: {
    isLength: {
      options: {
        max: 20,
        min: 3,
      },
      errorMessage:
        "Username's length must be 20 characters maximum and 3 characters minimum.",
    },
    custom: {
      options: async (value) => {
        // const user = await userModel.find({
        //   username: value,
        // });
        // if (user.length != 0) {
        //   throw new Error("Name already registered");
        // }
        
        const ifExist = checkIfEmailExist(value);
        if (!ifExist) throw new Error("Email already registered!")
      },
    },
  },
  email: {
    isEmail: true,
    errorMessage: "Invalid email address",
    custom: {
      options: async (value) => {
        const user = await userModel.find({
          email: value,
        });
        let test = user.length != 0;
        if (test) {
          throw new Error("Email already registered");
        }
        console.log(test);
      },
    },
  },
  password: {
    isLength: {
      options: {
        max: 30,
        min: 7,
      },
      errorMessage:
        "password's length must be 30 characters maximum and 7 characters minimum.",
    },
  },
  confrmedPassword: {
    isLength: {
      options: {
        max: 30,
        min: 7,
      },
      errorMessage:
        "password's length must be 30 characters maximum and 7 characters minimum.",
    },
    custom:{
        options : async (value ,{req}) => {
            // console.log(value)
            // console.log(req)
            if(value != req.body.password){
              throw new Error("Password mistatched!")
            }
        }
    }
  },
});


const loginUserValidator = checkSchema({
  email: {
      isEmail: true,
      errorMessage: "Invalid email address",
      custom: {
          options: async value => {
              // const user = await userModel.find({
              //     email: value
              // })
              // if (user.length == 0) {
              //     throw new Error("Email not registered")
              // }

              const ifExist = checkIfEmailExist(value);
              if (!ifExist) throw new Error("Email not registered!")
          }
      }
  },
  password: {
      isLength: {
          options: {
              max: 30,
              min: 6
          },
          errorMessage: "Password length must be 20 characters maximum and 3 characters minimum."
      }
  }
})


module.exports = { createUserValidator, loginUserValidator };
