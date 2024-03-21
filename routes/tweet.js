const express = require('express')
const tweetRoute = express.Router()
const { getTweetById , getAllTweets} = require("../controllers/tweetController.js")
const {verifyToken} = require("../middlewares/index.js")

// const {createUserValidator} = require('../validators/index.js')

// const {handleValidation} = require('../middlewares/index.js')

tweetRoute.get('/',
// verifyToken, 
getAllTweets );

tweetRoute.get('/:id',verifyToken, getTweetById)

tweetRoute.post('/', (req, res) => {
    res.send('Hello World 2!')
})

tweetRoute.delete('/:userId', (req, res) => {
    res.send('Hello World 2!')
})

tweetRoute.put('/:userId', (req, res) => {
    res.send('Hello World 2!')
})

module.exports = tweetRoute
