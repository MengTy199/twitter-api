const asyncHandler = require('express-async-handler')


const { tweetModel } = require("../models/tweet.js")

const getTweetById = asyncHandler (async (req, res) => {
    const id = req.params.id
    const tweet = await tweetModel.findById(id).populate("byUser")
    res.send(tweet)
})

const getAllTweets = async (req, res) =>{
    const tweet = await tweetModel.find({});

    res.status(200).send(tweet);
}



module.exports = { getTweetById,getAllTweets }