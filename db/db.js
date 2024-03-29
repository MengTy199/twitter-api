const mongoose = require("mongoose");
require('dotenv').config();// env config

// const url = "mongodb://localhost:2121/twitter-db"; for local
// const url = "mongodb+srv://mengty:V3FWrynq90iMpZsE@twitterdb.fwy18yf.mongodb.net/?retryWrites=true&w=majority"
const url = process.env.MOGODB_URL

async function dbConnect() {
  mongoose.connection.on("connected", () => console.log("Connected"));
  mongoose.connection.on("open", () => console.log("open"));
  console.log(process.env.MOGODB_URL)
  await mongoose.connect(url,{
    dbName: 'tw-db'//create  db
  });
}

module.exports = dbConnect;
