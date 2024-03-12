const express = require("express");
const app = express();
const port = 3000;
const user = require("./routes/user.js")
// const follower = require("./routes/follower.js")
const tweet = require("./routes/tweet.js")
const dbConnect = require("./db/db.js")

const bodyParser = require('body-parser')

var jsonParser = bodyParser.json()

app.use(jsonParser)
dbConnect().catch((err) => { console.log(err) })
app.use(express.static("frontend/dist"))

app.use("/api/users", user)
// app.use("/api/follower", follower)
app.use("/api/tweets" , tweet)
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

