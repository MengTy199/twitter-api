const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new  Schema({
    email: { type:String, required: true, unique: true},
    username: {type: String, required: true, unique : true },
    dataOfBirth: Date,
    password: String,
    followers: [{type:mongoose.Types.ObjectId, ref :'users'}],
    followings: [{type:mongoose.Types.ObjectId, ref :'users'}],
    tweets: [{type:mongoose.Types.ObjectId, ref :'tweets'}],
})


const userModel = mongoose.model("users", userSchema)

module.exports = {userModel, userSchema}