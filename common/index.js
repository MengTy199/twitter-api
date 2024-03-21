const {userModel} = require("../models/user.js")
const jwt = require("jsonwebtoken");

const checkIfEmailExist = async (email) =>{
    const user = await userModel.findOne({email: email});
    if(!user) return false
    return true
}

const signToken =   (id,email,username) =>{
    const token = jwt.sign(
        {
          id: id,
          email: email,
          username: username,
          
        },
        process.env.SECRET,{
            expiresIn: '24h',
        }
      );
    return token
}

module.exports = {checkIfEmailExist, signToken}