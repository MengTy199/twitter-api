const express = require("express");
const app = express();
const port = 3000;
const user = require("./routes/user.js")
const auth = require("./routes/auth.js")
const tweet = require("./routes/tweet.js")
const dbConnect = require("./db/db.js")
const compression = require('compression')  
const cors = require("cors")
// const  morgan = require('morgan')
const dotenv = require("dotenv")
dotenv.config()


const bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
const passport = require("passport")
const { jwtStrategy } = require("./auth/jwtStrategy.js");
// const { googleStrategy } = require("./auth/googleStrategy.js");
const { verifyToken } = require("./middlewares/index.js");
const responseTime = require('response-time')
app.use(express.static("frontend/dist"))//for production
app.use(cors())
app.use(responseTime())
app.use(compression())
app.use(jsonParser)
dbConnect().catch((err) => { console.log(err) })
app.use(express.static("frontend/dist"))

passport.use(jwtStrategy)
// passport.use(googleStrategy)
app.use("/api/users", passport.authenticate('jwt',{session:false}), user);
app.use("/api/auth", auth)
app.use("/api/tweets",  
// passport.authenticate('jwt',{session:false}),verifyToken, 
tweet)




app.listen(port, () => {
  console.log(process.env.SECRET) 
  console.log(`Server is running on ${port}`);
});

