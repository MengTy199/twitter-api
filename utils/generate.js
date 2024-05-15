const { faker } = require('@faker-js/faker');
const { userModel } = require('../models/user.js')
const { tweetModel } = require('../models/tweet.js')
const users = 1;
const tweets = 30;

const dbConnect = require("../db/db.js")

dbConnect().catch((err) => { console.log(err) })

async function generate() {
    let userList = []
    for (let i = 0; i < users; i++) {
        let user = new userModel({
            email: faker.internet.email(),
            username: faker.internet.userName(),
            dateOfBirth: faker.date.birthdate(),
            password: faker.internet.password()
        })
        const result = await user.save()
        userList.push(result._id)
        console.log(`user: ${result._id} generated!`)
    }

    for (let i = 0; i < tweets; i++) {
        // const randomElement = userList[Math.floor(Math.random() * userList.length)];
        let tweet = new tweetModel({
            byUser: "660aa5a919d4a7f9d6b192ec",
            text: faker.lorem.paragraph(),
            createdDate: new Date()
        })
        const result = await tweet.save()
        console.log(`tweet: ${result._id} generated!`)
    }
}


generate()