const express = require("express")
const router = express.Router()
const followerController = require("../controllers/followerController.js");


router.post("/", jsonParser, followerController.createFollowers)

module.exports = router