// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:2121/myapp', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Define user schema
const userSchema = new mongoose.Schema({
    email: { type:String, required: true, unique: true},
    username: {type: String, required: true, unique : true },
    dateOfBirth: Date,
    password: String,
    followers: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    followings: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    tweets: [{type: mongoose.Types.ObjectId, ref: 'Tweet'}],
});

const User = mongoose.model('User', userSchema);

// Define tweet schema
const tweetSchema = new mongoose.Schema({
    content: String,
    author: {type: mongoose.Types.ObjectId, ref: 'User'}
});

const Tweet = mongoose.model('Tweet', tweetSchema);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to create a new user
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Route to create a new tweet
app.post('/tweets', async (req, res) => {
    try {
        const tweet = new Tweet(req.body);
        await tweet.save();
        res.status(201).send(tweet);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Route to get all tweets of a user
app.get('/users/:userId/tweets', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('tweets');
        res.send(user.tweets);
    } catch (error) {
        res.status(404).send({ error: 'User not found' });
    }
});

// Route to add a follower for a user
app.post('/users/:userId/followers/:followerId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const follower = await User.findById(req.params.followerId);

        if (!user || !follower) {
            return res.status(404).send({ error: 'User or follower not found' });
        }

        user.followers.push(follower._id);
        follower.followings.push(user._id);

        await user.save();
        await follower.save();

        res.send({ message: 'Follower added successfully' });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
