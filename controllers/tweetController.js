const asyncHandler = require('express-async-handler')
const mongoose = require("mongoose")
const {signToken} = require("../common/index.js")


const { tweetModel } = require("../models/tweet.js")
const getTweetById = asyncHandler (async (req, res) => {
    const id = req.params.id
    const tweet = await tweetModel.findById(id).populate("byUser")
    res.send(tweet)
})

const getAllTweets = (async (req, res) =>{
    const tweet = await tweetModel.find({id: _id});

    res.status(200).send(tweet);
})

const createTweet = async (req, res) => {
    const { text } = req.body
    console.log(req.user)

    const newTweet = new tweetModel({
        text: text,
        byUser:  req.user.id,
        createdDate: Date.now()
    })
    const result = await newTweet.save()
    res.send(result)
}



module.exports = { getTweetById,getAllTweets,createTweet }