const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const { signToken } = require("../common/index.js");

const { tweetModel } = require("../models/tweet.js");
const { userModel } = require("../models/user.js");
const getTweetById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const tweet = await tweetModel.findById(id).populate("byUser");
  res.send(tweet);
});

const getAllTweets = asyncHandler(async (req, res) => {
  const tweets = await tweetModel.find({});
  res.json(tweets);
});

const createTweet = async (req, res) => {
  // const { text } = req.body
  // const newTweet = new tweetModel({
  //     text: text,
  //     byUser:  req.user.id,
  //     createdDate: Date.now()
  // })
  // const result = await newTweet.save()
  // console.log(result)
  // res.send(result)const { userId, content } = req.body;

  try {
    const { text } = req.body;
    // Step 1: Create the new tweet
    const tweet = new tweetModel({
      text: text,
      byUser: req.user.id,
      createdDate: Date.now(),
    });
    await tweet.save();
    // Step 2: Find the user and add the tweet reference to their tweets array
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.tweets.push(tweet._id);
    await user.save();
    res.status(201).send(tweet);
  } catch (err) {
    throw new Error(err);
  }
};

const addImage = async (req, res) => {
  const tweetId = req.params.id;
  try {
    const tweet = await tweetModel.findById(tweetId);
  } catch (e) {
    return res.status(400).send(e);
  }
  try {
    const newFile = new imageModel({
      filename: req.file.filename,
      path: req.file.path,
      encoding: req.file.encoding,
      size: req.file.size,
    });
    const fileResult = await newFile.save();
    tweet.imageId = fileResult.id;
    const newTweet = await tweet.save();
    return res.status(202).json(newTweet);
  } catch (e) {
    return res.status(400).send(e);
  }

};
const fileSingleFile = (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ err: 'No file exists' });
    }
    
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  });
}
module.exports = { getTweetById, getAllTweets, createTweet, addImage, fileSingleFile };
