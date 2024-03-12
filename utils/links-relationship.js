const { userModel } = require('../models/user.js')
const { tweetModel } = require('../models/tweet.js')

const dbConnect = require("../db/db.js")

dbConnect().catch((err) => { console.log(err) })
async function linkRelation() {
    const tweets = await tweetModel.find({})//get all tweet
    const users = await userModel.find({}) //get all users
    users.forEach(async user => {
        const belongTweet = tweets.filter(tt => {
            return tt.byUser.toString() == user._id
        })
        let tweetArray = []
        belongTweet.forEach(ttt => {
            tweetArray.push(ttt._id)
        })
        user.tweets = tweetArray
        await user.save()
        console.log(`user: ${user._id} saved with tweets: ${tweetArray.length}`)
    })
}
linkRelation()