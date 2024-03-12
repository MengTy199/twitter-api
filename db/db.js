const mongoose = require("mongoose");

const url = "mongodb://localhost:2121/twitter-db";
async function dbConnect() {
  mongoose.connection.on("connected", () => console.log("Connected"));
  mongoose.connection.on("open", () => console.log("open"));
  await mongoose.connect(url);
}

module.exports = dbConnect;
