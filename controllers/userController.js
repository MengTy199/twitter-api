const model = require("../models/user.js")
const asyncHandler = require('express-async-handler')
const userModel = model.userModel
// const userValidatetor = require("../validators/index.js")



const getAllUsers = async (req, res) => {
    const users = await userModel.find({}).exec()
    res.send(users)
}

const getUserById = (async (req, res) => {
    let user = await userModel.findById(req.params.id).exec()
    res.send(user)
})

const deleteById = (async (req, res) => {
    const result = await userModel.deleteOne({ _id: req.params.id })
    res.send(result)
})

const createUser = (asyncHandler(async (req, res) => {

    const  newUser = new userModel(req.body)
    const result = await newUser.save()
    res.send(result)
    console.log(result)
}))

const updateById = (asyncHandler(async (req, res) => {
    const id = req.params.id
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
        new: true
    })
    res.send(updatedUser)
}))
const getTweetsByUserId = (asyncHandler(async (req, res) => {
    const id = req.params.userId
    const users = await userModel.findById(id)
    .populate('tweets')
    .select("tweet")    

    res.send(users)
}))


module.exports = {
    getAllUsers,
    getUserById,
    deleteById,
    createUser,
    updateById,
    getTweetsByUserId
}

